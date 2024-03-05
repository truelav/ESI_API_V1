import fs from "fs";
import Product from "../models/Product/Product.Schema.js";

export const findProductService = async (data) => {
  const product = await Product.findById(data)
  return product
}

export const updateProductService = (product) => {
  const { features } = product

  const updatedFeatures = JSON.parse(features)
  product.features = updatedFeatures

  return product
}

export const editProductService = async (product) => {

  const newProduct = updateProductService(product)
  const { _id } = product

  const updatedProduct = await Product.findOneAndUpdate({_id},{ ...newProduct })

  return updatedProduct
}

export const findAllProductsById = async ({ IDs }) => {
  const productDetails = await Product.find({ _id: { $in: prodIDs } });

  if (!productDetails) {
    res
      .status(300)
      .json({ message: "Oooops something went wrong in Database" });
    return;
  }

  return productDetails;
};

export const deleteProductImage = async ({ product }) => {
  // const [] = fileLink.split("-")
  console.log(product);
  const { images } = product;
  return fs.unlink(images, (err) => {
    if (err) {
      return err;
    }

    return true;
  });
};
