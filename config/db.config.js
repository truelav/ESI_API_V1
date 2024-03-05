import mongoose from "mongoose";
import env from "dotenv";

const dotenv = env.config();
const devConnection = process.env.MONGODB_STRING;
const prodConnection = process.env.DB_STRING_PROD;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect("mongodb://127.0.0.1:27017/ESI");

    console.log("Connected to the DB");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
