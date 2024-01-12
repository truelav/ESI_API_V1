import createError from 'http-errors';
import { HTTPStatusCodes } from '../../utils/constants.js';
import Product from "../../models/Product/Product.js";

export const editSingleProduct = async (req, res) => {

    const {
        _id,
        name,
        brand,
        model,
        price,
        description,
        category,
        subcategory,
        quantity,
        upc,
        images
    } = req.body;
    console.log(req.body)
    try {
        console.log("request file: " + req.file);

        await Product.findOneAndUpdate(
            {_id},
            {
                _id,
                name,
                brand,
                model,
                price,
                description,
                category,
                subcategory,
                quantity,
                images: "http://localhost:8888/static/images/" + req.file?.filename,
                upc,
            },
        )

        res.status(200).json({ message: `Product ${name, brand} modified successfully` });

    } catch(error){
        console.log(error)
        next(createError(HTTPStatusCodes.InternalServerError, error.message));
    }
}