import bcrypt from "bcryptjs";
import createError from 'http-errors';
import User from "../../models/User/User.js";
import UserDto from "../../utils/user_dto.js";
import {
  generateAccessToken,
  generateRefreshToken,
  saveToken,
} from "../../services/token_service.js";
import { ROLES_LIST } from "../../config/roles.config.js";
import { HTTPStatusCodes } from "../../utils/constants.js";



export const login = async (req, res, next) => {

  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });
    
    if (!user) {
      return next(createError(HTTPStatusCodes.NotFound, `User with ${email} not found`))
    }

    const isPasswordCorrect = await bcrypt.compare(password, user?.password);

    if (!isPasswordCorrect) {
      return next(createError(HTTPStatusCodes.Forbidden, `password or email are incorrect or does not match`))
    }

    const role = user.role;
    const userRole = ROLES_LIST.role;

    const userDto = new UserDto(user);
    const accessToken = generateAccessToken({ ...userDto });
    const refreshToken = generateRefreshToken({ ...userDto });

    await saveToken(userDto.id, refreshToken);

    res.status(200).json({
      message: "Login Successful",
      accessToken,
      refreshToken,
      userDto,
    });
    
  } catch (error) {
    next(createError(HTTPStatusCodes.InternalServerError, error.message));
  }
};

