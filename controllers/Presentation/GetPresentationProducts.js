import createError from 'http-errors';
import { HTTPStatusCodes } from '../../utils/constants.js';
import Product from "../../models/Product/Product.js";
import { transformProductsForPresentation } from '../../utils/transformPrice.js';

export const getBrandedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});

    if(!products){
      res.status(400).json({message: "no products found",products: []})
    }

    const transformedProducts = transformProductsForPresentation(products)

    res.status(200).json(transformedProducts);
    
  } catch (error) {
    console.log(error)
    next(createError(HTTPStatusCodes.InternalServerError, error.message));
  }
};
