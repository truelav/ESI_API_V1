import User from "../../models/User/User.js";
import Role from "../../models/Role/Role.js";

const isAdmin = async (req, res, next) => {
  const { id } = req.id;
  try {
    const user = await User.findOne(id);
    if (!user) {
      res.status(500).json({ message: `user not found` });
    }

    const role = await Role.findById(user.role);
    if (role !== "admin") {
      res.status(400).json({ message: `user has no admin permissions` });
    }

    console.log("user is admin");
    next();
  } catch (error) {
    console.log(error);
    res.send(500).json({ message: error });
  }
};

export default isAdmin;
