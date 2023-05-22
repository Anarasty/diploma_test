import Product from "../DB/productDBcreate.js";
import express from "express";
import data from "../data.js";
import User from "../DB/userDBcreate.js";

const seedLinkSetup = express.Router();

seedLinkSetup.get("/", async (request, response) => {
  await Product.remove({});
  const createProducts = await Product.insertMany(data.products);
  await User.remove({});
  const createUsers = await User.insertMany(data.users);
  response.send({ createProducts, createUsers });
});

export default seedLinkSetup;
