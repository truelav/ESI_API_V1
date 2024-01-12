import { authorizationRoles, HTTPStatusCodes } from "../utils/constants.js";
import User from "../models/User/User.js";
import UserError from "../middleware/error/userError.js";

export const registerService = async (req, req, next) => {
  try {
    const { name, email, password, role } = req.body;
    let userRole = authorizationRoles.role;
    const user = await User.findOne({ email });

    if (user) {
      return next(
        new UserError(
          HTTPStatusCodes.ExistsAlready,
          `User with ${username} already exists, please pick a different one`,
        ),
      );
    }
  } catch (err) {
    return next(err);
  }
};
