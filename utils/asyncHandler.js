import createError from "http-errors";
import { HTTPStatusCodes } from "./constants.js";

const asyncHandler = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      console.error(error.stack);
      next(createError(HTTPStatusCodes.InternalServerError, error.message));
    }
  };
};

export default asyncHandler;
