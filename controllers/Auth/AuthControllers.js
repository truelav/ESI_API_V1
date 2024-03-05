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

export const signup = async (req, res, next) => {
  try {
    const { fullname, company, phone, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return next(createError(HTTPStatusCodes.ExistsAlready, `user with ${email} already exists`))
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new User({
      name: fullname,
      company,
      phone,
      email,
      role: "CUSTOMER",
      password: hashedPassword,
      isActive: false
    });

    await newUser.save();

    res.status(201).json({
      message: `$Dear ${fullname}, your account was created, we will review your application shortly`,
      body: {
        company,
        phone,
        email
      }
    });

  } catch(error){
    next(createError(HTTPStatusCodes.InternalServerError, error.message));
  }
}

export const login = async (req, res, next) => {

  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user) {
      next(createError(HTTPStatusCodes.NotFound, `User with ${email} not found`))
      return
    }

    const isPasswordCorrect = await bcrypt.compare(password, user?.password);

    if (!isPasswordCorrect) {
      next(createError(HTTPStatusCodes.Forbidden, `Password or Email are incorrect or do not match`))
      return
    }

    if (!user.isActive) {
      next(createError(HTTPStatusCodes.Forbidden, `Your account is not active, please contact us to activate it`))
      return
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
    return
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
    return res.status(200).json({ message: "Logout success", token });
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
      return res.status(400).json({ message: "no users found", users: [] });
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
      return res.status(400).json({ message: "no user found", user: {} });
    }

    return res.status(200).json(user);
  } catch (error) {
    next(createError(HTTPStatusCodes.InternalServerError, error.message));
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return next(createError(HTTPStatusCodes.NotFound, `User not found`))
    }

    const userDto = new UserDto(user);

    const emailResult = await sendDeleteUserEmail(user.email)

    return res.json({ message: `user ${user.email} deleted success`, emailResult });
  } catch (error) {
    next(createError(HTTPStatusCodes.InternalServerError, error.message));
  }
};

export const editUser = async (req, res, next) => {
  try {
      const { name, email, password} = req.body
      
  } catch (error) {
    next(createError(HTTPStatusCodes.InternalServerError, error.message));
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "no users found", users: [] });
    }

    // resetPasswordService

    // Send the email to user that the password was reseted
    res.status(200).json({ message: `Dear ${email} your password was reseted succes, please check your email` })

  } catch(error){
    next(createError(HTTPStatusCodes.InternalServerError, error.message));
  }
}

export const activateDeactivateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    console.log(req.body)
    const user = await User.findById(userId);

    if (!user) {
      return next(createError(HTTPStatusCodes.NotFound, `User not found`))
    }

    let isUserActive = !user.isActive
    const updatedUser = await User.findOneAndUpdate({ _id: userId }, { isActive: isUserActive })

    // Update user about his account update email service

    return res.json({ message: `user ${user.email} was ${isUserActive? "activated" : "deactivated"}` });
  } catch (error) {
    next(createError(HTTPStatusCodes.InternalServerError, error.message));
  }
}
