import mongoose from "mongoose";
import env from "dotenv";

const dotenv = env.config();
const devConnection = process.env.MONGODB_STRING;
const prodConnection = process.env.DB_STRING_PROD;
const MongoURI = process.env.MONGO_CONNECTION_STRING;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(MongoURI);

    console.log("Connected to the DB");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
