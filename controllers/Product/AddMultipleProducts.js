import streamifier from "streamifier";
import parse from "csv-parser";
import createError from 'http-errors';
import { HTTPStatusCodes } from '../../utils/constants.js';
import Product from "../../models/Product/Product.Schema.js";
import { bulkProductOperations, updateProductService } from "../../services/product/product_service.js";

export const addMultipleProducts = async (req, res, next) => {
  try {
    const { buffer } = req.file;
    const newProducts = [];

    streamifier
      .createReadStream(buffer)
      .pipe(
        parse({ delimiter: ",", ignoreEmpty: true })
      )
      .on("data", (row) => updateProductService(newProducts, row))
      .on("end", async () => {

        const bulkOps = bulkProductOperations(newProducts)

        await Product.bulkWrite(bulkOps)
        .then((result) => {
          res.status(200).json(`success, all ${newProducts.length} were added, ${result}`);
        })
        .catch((error) => {
          console.log(error);
          next(createError(HTTPStatusCodes.InternalServerError, error.message));
        });
      });
  } catch (error) {
    console.log(error);
    next(createError(HTTPStatusCodes.InternalServerError, error.message));
  }
};
