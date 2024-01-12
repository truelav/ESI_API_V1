import User from "../../models/User/User.js";

export const activateUser = async () => {
    try {
      const userId = req.body.id;
      const user = await User.findById(userId);
      if (!user) {
        res.status(400).json({ message: "no users found" });
      }
  
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $set: { isActive: true } },
        {
          upsert: true,
          returnDocument: "after", // this is new !
        }
      );
  
      res
        .status(200)
        .json({ message: "User Updated Successfully", user: updatedUser });
    } catch (error) {
      next(error);
    }
  };
  