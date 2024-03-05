import fs from "fs";
import createError from 'http-errors';
import { HTTPStatusCodes } from '../../utils/constants.js';
import Product from "../../models/Product/Product.Schema.js";

// const unlinkAsync = promisify(fs.unlink)

export const deleteSingleProduct = async (req, res) => {
  try {
    const id = req.params.id
    const product = await Product.findById(id);

    if(!product){
      return next(createError(HTTPStatusCodes.InternalServerError, "Product selected to delete not found"));
    } 
    // delete image
    const { images } = product
    // fallback image
    const backend_fallback_image = "http://localhost:8888/static/images/fallback_image.jpeg"
    const frontend_fallback_image = "/fallback_image.jpeg"
    
    if (images && images !== backend_fallback_image && images !== frontend_fallback_image){
      const imagePath = images.slice(22)
      // await unlinkAsync(imagePath)
      fs.unlink(imagePath, (err) => {
        if(err) console.log(err)
        return
      })
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    res.status(200).json({message: "product delete success", deletedProduct: deletedProduct});
    
  } catch (error) {
    console.log(error)
    next(createError(HTTPStatusCodes.InternalServerError, error.message));
  }
}; 
