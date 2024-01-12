import jwt from "jsonwebtoken";
import JWToken from "../models/JWToken/JWToken.js";

export const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "5m",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  return { accessToken, refreshToken };
};

export const generateAccessToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "5m",
  });
  return accessToken;
};

export const generateRefreshToken = (payload) => {
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  return refreshToken;
};

export const validateAccessToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    return userData;
  } catch (error) {
    return null;
  }
};

export const validateRefreshToken = (token) => {
  try {
    const userData = jwt.verify(
      token,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      //   (error, decoded) => {
      //     if (error) {
      //       return null; //invalid token
      //     }
      //     return decoded;
      //   }
    );
    return userData;
  } catch (error) {
    return null;
  }
};

export const saveToken = async (userId, refreshToken) => {
  try {
    const tokenData = await JWToken.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await JWToken.create({ user: userId, refreshToken });
    return token;
  } catch (error) {
    return null;
  }
};

export const findToken = async (refreshToken) => {
  const tokenData = await JWToken.findOne({ refreshToken });
  return tokenData;
};

export const deleteToken = async (refreshToken) => {
  const tokenData = await JWToken.delete({ refreshToken });
  return tokenData;
};

// const verifyToken = async (req, res, next) => {
//     console.log("token: " + token);
//     const authHeader = req.headers.authorization || req.headers.Authorization

//     if (!authHeader?.startsWith('Bearer')) {
//       return res.status(401).json({ message: "no permission" });
//     }

//     const token = authHeader.split(' ')[1]

//     jwt.verify(
//       token,
//       "secret123",
//       (error, decoded) => {
//         if (error) return res.sendStatus(403).json({message: "invalid token"}); //invalid token
//         req.user = decoded.UserInfo.username;
//         req.role = decoded.UserInfo.role
//         next()
//       }
//     );
//   };
