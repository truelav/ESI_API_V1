import createError from 'http-errors';
import { HTTPStatusCodes } from '../../utils/constants.js';
import Product from "../../models/Product/Product.js";

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});

    if(!allProducts){
      res.status(300).json({message: "no products found", allProducts: []})
    }

    res.status(200).json(allProducts);
    
  } catch (error) {
    console.log(error)
    next(createError(HTTPStatusCodes.InternalServerError, error.message));
  }
};
