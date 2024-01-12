import { faker } from "@faker-js/faker";
// import { createProduct } from "../controllers/Product/ProductController";
import mongoose from "mongoose";
import Product from "../models/Product/Product.js";

const products = [];

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ESI", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the DB");
  } catch (err) {
    console.log(err);
  }
};

const createFakeProducts = () => {
  for (let i = 0; i <= 2; i++) {
    let newProd = {};
    newProd.name = faker.commerce.productName();
    newProd.brand = faker.commerce.department();
    newProd.description = faker.commerce.productDescription();
    newProd.category = faker.commerce.department();
    newProd.subcategory = faker.commerce.productAdjective();
    newProd.price = Number(faker.commerce.price({ min: 9, max: 200 }));
    newProd.quantity = Number(faker.commerce.price({ min: 1, max: 1000 }));
    newProd.images = faker.image.url({ width: 600, height: 400 });
    newProd.location = faker.location.city();

    products.push(newProd);
    console.log(newProd);
  }
};

const seedDB = async () => {
  try {
    await connectDB();
    await Product.insertMany(products);

    await mongoose.disconnect();
    console.log("DB disconnected");
  } catch (err) {
    console.log(err);
  }
};

seedDB();
