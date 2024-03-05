import bcrypt from "bcryptjs";
import { authorizationRoles, HTTPStatusCodes } from "../../utils/constants.js";
import User from "../../models/User/User.js";
import UserError from "../../middleware/error/userError.js";

// export const registerService = async (req, req, next) => {
//   try {
//     const { name, email, password, role } = req.body;
//     let userRole = authorizationRoles.role;
//     const user = await User.findOne({ email });

//     if (user) {
//       return next(
//         new UserError(
//           HTTPStatusCodes.ExistsAlready,
//           `User with ${username} already exists, please pick a different one`,
//         ),
//       );
//     }
//   } catch (err) {
//     return next(err);
//   }
// };

export const findUserService = async (data) => {
  const user = await User.findOne({data})

  return user
}

export const createUserService = async (data) => {

}

export const saveNewUserService = async (data) => {
  const { name, email, role, hashedPassword } = data
  const newUser = new User({
    name,
    email,
    role,
    password: hashedPassword,
  });

  return newUser
}

export const deleteUserService = async (data) => {

}

export const hashPasswordService = async (data) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data, salt);

  return hashedPassword
}

export const checkUserPassword = async (data) => {
  const { sentPassword, userPassword } = data
  const isPasswordCorrect = await bcrypt.compare(sentPassword, userPassword)
  
  return isPasswordCorrect
}
