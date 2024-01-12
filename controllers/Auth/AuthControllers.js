import bcrypt from "bcryptjs";
import createError from 'http-errors';
import User from "../../models/User/User.js";
import UserDto from "../../utils/user_dto.js";
import JWToken from "../../models/JWToken/JWToken.js";
import {
  generateAccessToken,
  generateRefreshToken,
  saveToken,
  validateRefreshToken,
  findToken,
  generateTokens,
  deleteToken,
} from "../../services/token_service.js";
import { sendCreateUserEmail, sendDeleteUserEmail } from "../../services/email_service.js";
import { ROLES_LIST } from "../../config/roles.config.js";
import { HTTPStatusCodes } from "../../utils/constants.js";

export const register = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      return next(createError(HTTPStatusCodes.ExistsAlready, `user with ${email} already exists`))
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      role,
      password: hashedPassword,
    });

    // const userDto = new UserDto(newUser);
    const accessToken = generateAccessToken({ ...newUser });
    const refreshToken = generateRefreshToken({ ...newUser });
    const newToken = new JWToken({
      user: newUser.id,
      refreshToken,
    });


    await newUser.save();
    await newToken.save();

    const emailResult = await sendCreateUserEmail(email, password)

    // if(!emailResult){
    //   return next(createError(HTTPStatusCodes.BadRequest, `Some email error occured`))
    // }

    res.status(201).json({
      message: `${req.body.name} was created with success`,
      newUser,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(createError(HTTPStatusCodes.InternalServerError, error.message));
  }
};


export const login = async (req, res) => {
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

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const userData = validateRefreshToken(refreshToken);
    const refreshTokenFromDB = await findToken(refreshToken);

    if (!userData || !refreshTokenFromDB) {
      return next(createError(HTTPStatusCodes.Unauthorized, `Unauthorized request`))
    }

    const user = await User.findById(userData.id);

    if (!user) {
      return next(createError(HTTPStatusCodes.NotFound, `User with ${email} not found`))
    }

    const userDto = new UserDto(user);
    const tokens = generateTokens({ ...userDto });

    await saveToken(userDto.id, tokens.refreshToken);

    res.cookie("refreshToken", tokens.accessToken, tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });
    return res.json({
      userDto,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (error) {
    next(createError(HTTPStatusCodes.InternalServerError, error.message));
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    if (!users) {
      res.status(400).json({ message: "no users found", users: [] });
    }

    return res.json(users);
  } catch (error) {
    next(createError(HTTPStatusCodes.InternalServerError, error.message));
  }
};

export const getSingleUser = async (req, res, next) => {
  try {
    const userId = req.params.id
    const user = await User.findById(userId);

    if (!user) {
      res.status(400).json({ message: "no user found", user: {} });
    }

    return res.json(user);
  } catch (error) {
    next(createError(HTTPStatusCodes.InternalServerError, error.message));
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return next(createError(HTTPStatusCodes.NotFound, `No use found`))
    }

    const userDto = new UserDto(user);

    const emailResult = await sendDeleteUserEmail(user.email)

    return res.json({ message: `user ${user.email} deleted success`, userDto });
  } catch (error) {
    next(createError(HTTPStatusCodes.InternalServerError, error.message));
  }
};




