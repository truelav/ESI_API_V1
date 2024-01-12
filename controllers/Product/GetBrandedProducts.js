import createError from 'http-errors';
import { HTTPStatusCodes } from '../../utils/constants.js';
import Product from "../../models/Product/Product.js";

export const getBrandedProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.find({});

    if(!allProducts){
      res.status(400).json({message: "no products found", allProducts: []})
    }

    // Modify the response data as needed
    const groupedProducts = {};

    allProducts.forEach((product) => {
        const { brand } = product;

        groupedProducts[brand] = [];
        groupedProducts[brand].push(product);
    });

    // // Convert the grouped products into an array of objects
    const transformedData = Object.entries(groupedProducts).map(
        ([brand, products]) => ({
            brand,
            products,
        })
    );

    res.status(200).json(transformedData);
    
  } catch (error) {
    console.log(error)
    next(createError(HTTPStatusCodes.InternalServerError, error.message));
  }
};
