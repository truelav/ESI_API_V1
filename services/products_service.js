import env from 'dotenv';
import Product from '../models/Product/Product.Schema.js';

const NODE_ENV = process.env.NODE_ENV;
const STATIC_URL_DEVELOPMENT = process.env.STATIC_URL_DEVELOPMENT;
const STATIC_URL_PRODUCTION = process.env.STATIC_URL_PRODUCTION;

export const findProductService = async (data) => {
  const product = await Product.findById(data);
  return product;
};

export const updateProductImageService = (product, imageFile) => {
  let images = product.images;

  if (imageFile && NODE_ENV === 'development') {
    images = STATIC_URL_DEVELOPMENT + '/images/' + imageFile.filename;
  } else if (imageFile && NODE_ENV !== 'development') {
    images = STATIC_URL_PRODUCTION + '/images/' + imageFile.filename;
  }

  return images;
};

export const updateProductInfoService = (product, imageFile) => {
  const { model, brand, description, category, upc, price, quantity, features } = product;
  const images = updateProductImageService(product, imageFile);

  const updatedFeatures = JSON.parse(features);
  const newProduct = {
    ...product,
    model,
    brand,
    description,
    category,
    upc,
    price,
    images,
    quantity,
    features: updatedFeatures,
  };
  return newProduct;
};

export const editProductService = async (product, imageFile) => {
  let updatedProduct = updateProductInfoService(product, imageFile);

  return updatedProduct;
};

export const findAllProductsById = async ({ IDs }) => {
  const productDetails = await Product.find({ _id: { $in: prodIDs } });

  if (!productDetails) {
    res.status(300).json({ message: 'Oooops something went wrong in Database' });
    return;
  }

  return productDetails;
};
