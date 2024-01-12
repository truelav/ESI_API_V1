import ApiError from "../error/apiError";
import { validateAccessToken } from "../../services/token_service";

export const authMiddleware = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;

    //  here we also have to check the user role

    next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
};
