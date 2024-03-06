import env from 'dotenv';
import createError from 'http-errors';
import Product from '../../models/Product/Product.Schema.js';
import { HTTPStatusCodes } from '../../utils/constants.js';
import { editProductService } from '../../services/products_service.js';

const dotenv = env.config();
const NODE_ENV = process.env.NODE_ENV;
const STATIC_URL_DEVELOPMENT = process.env.STATIC_URL_DEVELOPMENT;
const STATIC_URL_PRODUCTION = process.env.STATIC_URL_PRODUCTION;

export const editSingleProduct = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const updatedProduct = await editProductService(req.body, req.file);
    const updatedProductResult = await Product.findOneAndUpdate({ _id }, { ...updatedProduct });

    if (!updatedProduct) {
      res.status(400).json({ message: 'something went wrong updating product', updatedProduct });
    }

    res.status(200).json({
      message: `Product ${updatedProductResult.brand} - ${updatedProductResult.model} modified successfully`,
      updatedProduct,
    });
  } catch (error) {
    console.log(error);
    next(createError(HTTPStatusCodes.InternalServerError, error.message));
  }
};
