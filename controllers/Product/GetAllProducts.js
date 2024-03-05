import createError from 'http-errors';
import Product from "../../models/Product/Product.Schema.js";
import { HTTPStatusCodes } from '../../utils/constants.js';
import { createCategorySubcategoryArray } from "../../utils/product.utils.js"

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});

    if(!allProducts){
      res.status(300).json({message: "no products found", allProducts: []})
    }

    const categories = createCategorySubcategoryArray(allProducts)

    res.status(200).json({allProducts, categories});
    
  } catch (error) {
    console.log(error)
    next(createError(HTTPStatusCodes.InternalServerError, error.message));
  }
};
