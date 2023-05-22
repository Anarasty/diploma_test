import bcrypt from "bcryptjs";
import User from "../DB/userDBcreate.js";
import { authorizationCheck, generateToken } from "../utils.js";
import express from "express";
import expressAsyncHandler from "express-async-handler";

const userLinkSetup = express.Router();

userLinkSetup.post(
  "/login",
  expressAsyncHandler(async (request, response) => {
    const user = await User.findOne({ email: request.body.email });
    if (user) {
      if (bcrypt.compareSync(request.body.password, user.password)) {
        response.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    response.status(401).send({ message: "Invalid email or password" });
  })
);

userLinkSetup.post(
  "/register",
  expressAsyncHandler(async (request, response) => {
    const newUser = new User({
      name: request.body.name,
      email: request.body.email,
      password: bcrypt.hashSync(request.body.password),
    });
    const user = await newUser.save();
    response.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

userLinkSetup.put(
  "/edituser",
  authorizationCheck,
  expressAsyncHandler(async (request, response) => {
    const user = await User.findById(request.user._id);
    if (user) {
      user.name = request.body.name || user.name;
      user.email = request.body.email || user.email;
      if (request.body.password) {
        user.password = bcrypt.hashSync(request.body.password, 8);
      }

      const updatedUserInformation = await user.save();
      response.send({
        _id: updatedUserInformation._id,
        name: updatedUserInformation.name,
        email: updatedUserInformation.email,
        isAdmin: updatedUserInformation.isAdmin,
        token: generateToken(updatedUserInformation),
      });
    } else {
      response.status(404).send({ message: "No such user!" });
    }
  })
);

export default userLinkSetup;
