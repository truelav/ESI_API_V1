import fs from "fs";
import Product from "../models/Product/Product.js";

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
