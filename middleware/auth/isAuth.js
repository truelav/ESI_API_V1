import { token } from "morgan";
import User from "../../models/User/User.js";
import verifyJWToken from "./verifyJWToken";

const isAuth = async (req, res, next) => {
  const { id } = req.id;
  console.log("userID: " + id);
  try {
    const user = await User.findById(req.id);
    res.status(200).json({ message: "Success", user });

    //verify the use token
    verifyJWToken(token);
    next();
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "User not found", error });
  }
};

export default isAuth;
