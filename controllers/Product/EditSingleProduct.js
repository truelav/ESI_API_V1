import createError from 'http-errors';
import Product from '../../models/Product/Product.Schema.js';
import { HTTPStatusCodes } from '../../utils/constants.js';
import { editProductService } from '../../services/products_service.js';
import { deleteImage } from '../../utils/files/files.js';

export const editSingleProduct = async (req, res, next) => {
  try {
    console.log(req.body);
    const { _id } = req.body;
    const updatedProduct = await editProductService(req.body, req.file);
    const updatedProductResult = await Product.findOneAndUpdate({ _id }, { ...updatedProduct }, { new: true });

    if (!updatedProduct) {
      res.status(400).json({ message: 'something went wrong updating product', updatedProduct });
    }

    await deleteImage(req.body.images);

    res.status(200).json({
      message: `Product ${updatedProductResult.brand} - ${updatedProductResult.model} modified successfully`,
      updatedProduct,
    });
  } catch (error) {
    console.log(error);
    next(createError(HTTPStatusCodes.InternalServerError, error.message));
  }
};
