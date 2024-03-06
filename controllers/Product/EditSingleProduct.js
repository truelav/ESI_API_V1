import env from 'dotenv';
import createError from 'http-errors';
import { HTTPStatusCodes } from '../../utils/constants.js';
import { editProductService } from '../../services/products_service.js';

const dotenv = env.config();
const NODE_ENV = process.env.NODE_ENV;
const STATIC_URL_DEVELOPMENT = process.env.STATIC_URL_DEVELOPMENT;
const STATIC_URL_PRODUCTION = process.env.STATIC_URL_PRODUCTION;

export const editSingleProduct = async (req, res, next) => {
  try {
    const data = req.body;
    console.log('file: ' + req.file);

    if (req.file) {
      if (NODE_ENV === 'development') {
        data.images = STATIC_URL_DEVELOPMENT + '/images/' + req.file.filename;
      } else {
        data.images = STATIC_URL_PRODUCTION + '/images' + req.file.filename;
      }
      // data.images = 'https://esi-api-v1.onrender.com/static/images/' + req.file?.filename;
    }

    const updatedProduct = await editProductService(data);

    if (!updatedProduct) {
      res.status(400).json({ message: 'something went wrong updating product', updatedProduct });
    }

    res.status(200).json({
      message: `Product ${updatedProduct.brand} - ${updatedProduct.model} modified successfully`,
      updatedProduct,
    });
  } catch (error) {
    console.log(error);
    next(createError(HTTPStatusCodes.InternalServerError, error.message));
  }
};
