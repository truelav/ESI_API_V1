import createError from 'http-errors';
import { HTTPStatusCodes } from '../../utils/constants.js';
import Product from "../../models/Product/Product.Schema.js";
import { transformProductsForPresentation } from '../../utils/transformPrice.js';

export const getBrandedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});

    if(!products){
      res.status(400).json({message: "no products found", allProducts: []})
    }

    const transformedProducts = transformProductsForPresentation(products)

    if(!transformedProducts){
      res.status(400).json({message: "no products found", allProducts: []})
    }

    res.status(200).json(transformedProducts);
    
  } catch (error) {
    console.log(error)
    next(createError(HTTPStatusCodes.InternalServerError, error.message));
  }
};

export const getTransformedProductsBy = async (req, res, next) => {
  try{
    const { transformBy } = req.body
    const products = await Product.find({});

    if(!products){
      res.status(400).json({message: "no products found", allProducts: []})
    }

    const transformedProducts = transformProductsForPresentation(products, transformBy)

    if(!transformedProducts){
      res.status(400).json({message: "no products found", allProducts: []})
    }

    res.status(200).json(transformedProducts);

  } catch(error){
    console.log(error)
    next(createError(HTTPStatusCodes.InternalServerError, error.message))
  }
}