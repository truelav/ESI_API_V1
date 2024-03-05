import bcrypt from "bcryptjs";
import createError from 'http-errors';
import User from "../../models/User/User.js";
import JWToken from "../../models/JWToken/JWToken.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../services/token_service.js";
import { sendCreateUserEmail } from "../../services/email_service.js";
import { HTTPStatusCodes } from "../../utils/constants.js";

export const signUp = async (req, res, next) => {
  const { name, email, company, phone, password, role } = req.body;
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
      company,
      phone,
      role,
      password: hashedPassword,
    });

    await newUser.save();

    const emailResult = await sendCreateUserEmail(email, password)

    res.status(201).json({
      message: `${req.body.name} was created with success`,
      newUser,
    });
  } catch (error) {
    next(createError(HTTPStatusCodes.InternalServerError, error.message));
  }
};