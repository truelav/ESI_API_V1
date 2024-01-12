import jwt from "jsonwebtoken";
import User from "../../models/User/User.js";

const isLoggedIn = async (req, res, next) => {
  console.log("userID: " + req.headers["jwt_token"]);
  try {
    const userID = req.headers.userid;
    const token = req.cookies["jwt_token"];
    const user = await User.findById(userID);

    if (!userID) {
      return res.redirect("/login");
    }

    // verify the user exists
    if (!user) {
      return res.status(500).json({ message: `user not found` });
    }
    if (!token) {
      return res.status(500).json({ message: `failed authorization` });
    }

    //verify the use token
    // if (!verifyJWToken(token)) {
    //   res.status(500).json({ message: `unauthorized request` });
    // }

    const auth_user = jwt.verify(token, "secret123");
    if (!auth_user) {
      return res.status(500).json({ message: `failed authorization` });
    }
    if (!auth_user.id) {
      return res.status(500).json({ message: `failed to authorize user` });
    }
    // if(auth_user !== user._id)
    // console.log("user Id and verify token: " + auth_user.id);

    next();
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "User not found", error });
  }
};

export default isLoggedIn;
