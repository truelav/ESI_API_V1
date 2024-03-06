import createError from 'http-errors';
import { HTTPStatusCodes } from '../../utils/constants.js';
import Product from '../../models/Product/Product.Schema.js';
import { deleteImage } from '../../utils/files/files.js';

export const deleteMultipleProducts = async (req, res, next) => {
  try {
    const idsToDelete = req.body || [];

    if (idsToDelete.length === 0) {
      return next(createError(HTTPStatusCodes.InternalServerError, 'there are no products selected to delete'));
    }

    idsToDelete.forEach((id) => {
      const result = Product.findByIdAndDelete(id)
        .then((deletedProduct) => {
          // console.log(deletedProduct);
          deleteImage(deletedProduct.images);
        })
        .catch((error) => {
          return next(createError(HTTPStatusCodes.InternalServerError, error.message));
        });
    });

    res.status(200).json({ message: 'product delete success' });
  } catch (error) {
    console.log(error);
    next(createError(HTTPStatusCodes.InternalServerError, error.message));
  }
};
