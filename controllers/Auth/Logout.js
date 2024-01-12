import createError from 'http-errors';
import {
  validateRefreshToken,
  deleteToken,
} from "../../services/token_service.js";
import { HTTPStatusCodes } from "../../utils/constants.js";

export const logout = async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      const userData = validateRefreshToken(refreshToken);
  
      if (refreshToken || !userData) {
        return next(createError(HTTPStatusCodes.Forbidden, `Validation error, Bad Request`))
      }
  
      const token = await deleteToken(refreshToken);
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "Logout success", token });
    } catch (error) {
      next(createError(HTTPStatusCodes.InternalServerError, error.message));
    }
  };