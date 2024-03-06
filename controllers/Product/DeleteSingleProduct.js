import createError from 'http-errors';
import { HTTPStatusCodes } from '../../utils/constants.js';
import Product from '../../models/Product/Product.Schema.js';
import { deleteImage } from '../../utils/files/files.js';

export const deleteSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      return next(createError(HTTPStatusCodes.InternalServerError, 'Product selected to delete not found'));
    }
    // delete image
    const { images } = product;
    // fallback image
    // const backend_fallback_image = 'https://esi-api-v1.onrender.com/static/images/fallback_image.jpeg';
    // const frontend_fallback_image = '/fallback_image.jpeg';

    await deleteImage(images);

    const deletedProduct = await Product.findByIdAndDelete(id);

    res.status(200).json({ message: 'product delete success', deletedProduct: deletedProduct });
  } catch (error) {
    console.log(error);
    next(createError(HTTPStatusCodes.InternalServerError, error.message));
  }
};
