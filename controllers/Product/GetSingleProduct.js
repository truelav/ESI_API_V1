import createError from 'http-errors';
import { HTTPStatusCodes } from '../../utils/constants.js';
import Product from "../../models/Product/Product.Schema.js";

export const getSingleProduct = async (req, res, next) => {
  
  try {
    const id = req.params.id
    const product = await Product.findById(id);

    if(!product){
      return next(createError(HTTPStatusCodes.NotFound, `Product with ${id} not found`))
    }

    res.status(200).json(product);
    
  } catch (error) {
    console.log(error)
    next(createError(HTTPStatusCodes.InternalServerError, error.message));
  }
};
