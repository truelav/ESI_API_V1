import streamifier from "streamifier";
import parse from "csv-parser";
import createError from 'http-errors';
import { HTTPStatusCodes } from '../../utils/constants.js';
import Product from "../../models/Product/Product.js";
import { transformPrice } from "../../utils/transformPrice.js";

export const addMultipleProducts = async (req, res, next) => {
  try {
    const { buffer } = req.file;
    const newProducts = [];
    // Parse the document into the fields and add each Product
    streamifier
      .createReadStream(buffer)
      .pipe(parse({ delimiter: ",", ignoreEmpty: true }))
      .on("data", (row) => {

        let numPrice = transformPrice(row.Price)

        const product = new Product({
          brand: row.Brand,
          model: row.Model,
          description: row.Description,
          category: row.Category,
          subcategory: row.subcategory,
          upc: row.UPC || 'No UPC Provided',
          price: numPrice || 1,
          quantity: row["Qty's"],
          images: row.images,
        });

        newProducts.push(product);
      })
      .on("end", async () => {
        const bulkOps = newProducts.map((product) => ({
          updateOne: {
            filter: { model: product.model },
            update: {
              $set: {
                brand: product.brand,
                model: product.model,
                price: product.price,
                description: product.description,
                category: product.category,
                subcategory: product.subcategory,
                quantity: product.quantity,
                images: product.images,
                upc: product.upc,
              },
            },
            upsert: true, // Creates a new document if no match is found
          },
        }));

        await Product.bulkWrite(bulkOps)
          .then((result) => {
            res
              .status(200)
              .json(`success, all ${newProducts.length} were added, ${result}`);
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
