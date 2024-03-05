import createError from 'http-errors'; 
import fs from "fs";
import { promisify } from "util"
import { HTTPStatusCodes } from '../../utils/constants.js';
import Product from "../../models/Product/Product.Schema.js";

export const deleteProductImage = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findById(id);
        const unlinkAsync = promisify(fs.unlink)
        if(!product){
            return res.status(404).json({message: 'product not found'})
        } 
        const {images} = product
        const imagePath = images.slice(21)
        // delete image
        fs.unlink('static/images/product.png', (err) => {
            if(err) console.log(err)
            return
        })

        res.status(200).json({message: "image delete success"});
    } catch (error) {
        console.log(error)
        next(createError(HTTPStatusCodes.InternalServerError, error.message));
    }
};
