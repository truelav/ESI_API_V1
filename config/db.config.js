import mongoose from 'mongoose';
import env from 'dotenv';

const dotenv = env.config();
const prodConnection = process.env.MONGODB_STRING;
const NODE_ENV = process.env.NODE_ENV;

const connectDB = async () => {
  try {
    if (NODE_ENV === 'development') {
      console.log('Connect to Development DB');
    } else {
      console.log('Connect to Production DB');
    }
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_STRING);

    console.log('Connected to the DB');
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
