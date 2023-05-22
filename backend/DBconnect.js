import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedLinkSetup from "./linksSetups/seedLinkConfig.js";
import productLinkSetup from "./linksSetups/productLinkConfig.js";
import userLinkSetup from "./linksSetups/userLinkConfig.js";
import orderLinkSetup from "./linksSetups/orderLinkConfig.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DB connection success");
  })
  .catch((error) => {
    console.log(error.message);
  });

const appControl = express();

appControl.use(express.json());
appControl.use(express.urlencoded({ extended: true }));

appControl.get('/api/keys/paypal', (request, response) => {
  response.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

appControl.use("/api/seed", seedLinkSetup);
appControl.use("/api/products", productLinkSetup);
appControl.use("/api/users", userLinkSetup);
appControl.use("/api/orders", orderLinkSetup);

appControl.use((error, request, response, next) => {
  response.status(500).send({ message: error.message });
});

const port = process.env.PORT || 3232;
appControl.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
