import createError from 'http-errors';
import { HTTPStatusCodes } from '../../utils/constants.js';
import Product from "../../models/Product/Product.js";

export const editMultipleProducts = async (req, res) => {
    try {
        res.status(200).json('success');
        
      } catch (error) {
        console.log(error)
        next(createError(HTTPStatusCodes.InternalServerError, error.message));
      }
}
