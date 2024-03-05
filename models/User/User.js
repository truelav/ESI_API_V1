import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    company: {
      type: String
    },
    phone: {
      type: String
    }, 
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      required: true,
    },
    orders: [],
    phone: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
