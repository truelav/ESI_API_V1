import createError from 'http-errors';
import User from "../../models/User/User.js";
import UserDto from "../../utils/user_dto.js";
import {  sendDeleteUserEmail } from "../../services/email_service.js";
import { HTTPStatusCodes } from "../../utils/constants.js";

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return next(createError(HTTPStatusCodes.NotFound, `No use found`))
    }

    const userDto = new UserDto(user);

    const emailResult = await sendDeleteUserEmail(user.email)

    return res.status(200).json({ message: `user ${user.email} deleted success`, userDto });
  } catch (error) {
    next(createError(HTTPStatusCodes.InternalServerError, error.message));
  }
};