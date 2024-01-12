import createError from 'http-errors';
import { HTTPStatusCodes } from "../../utils/constants.js";

export const editUser = async (req, res, next) => {
    try {
        const { name, email, password} = req.body
        
    } catch (error) {
      next(createError(HTTPStatusCodes.InternalServerError, error.message));
    }
  };