import createError from 'http-errors';
import { HTTPStatusCodes } from '../../utils/constants.js';
import { editProductService } from '../../services/products_service.js';

export const uploadImage = async (req, res, next) => {

    try {
        console.log('file: ' + req.file)

        if(req.file){
            data.images = "http://localhost:8888/static/images/" + req.file?.filename
        }

        const updatedProduct = await editProductService(data)

        if(!updatedProduct){
            res.status(400).json({ message: 'something went wrong updating product', updatedProduct })
        }

        res.status(200).json({ message: `Product ${updatedProduct.brand} - ${updatedProduct.model} modified successfully`, updatedProduct });

    } catch(error){
        console.log(error)
        next(createError(HTTPStatusCodes.InternalServerError, error.message));
    }
}