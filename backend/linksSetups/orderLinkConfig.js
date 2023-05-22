import expressAsyncHandler from "express-async-handler";
import express from "express";
import Order from "../DB/orderDBcreate.js";
import { authorizationCheck } from "../utils.js";

const orderLinkSetup = express.Router();
orderLinkSetup.post(
  "/",
  authorizationCheck,
  expressAsyncHandler(async (request, response) => {
    const newOrder = new Order({
      orderItems: request.body.orderItems.map((x) => ({ ...x, product: x._id })),
      deliveryAddress: request.body.deliveryAddress,
      paymentMethod: request.body.paymentMethod,
      itemsPrice: request.body.itemsPrice,
      totalPrice: request.body.totalPrice,
      user: request.user._id,
    });

    const order = await newOrder.save();
    response.status(201).send({ message: "New Order Created", order });
  })
);

orderLinkSetup.get(
  "/myorders",
  authorizationCheck,
  expressAsyncHandler(async (request, response) => {
    const orders = await Order.find({ user: request.user._id });
    response.send(orders);
  })
);

orderLinkSetup.get(
  "/:id",
  authorizationCheck,
  expressAsyncHandler(async (request, response) => {
    const order = await Order.findById(request.params.id);
    if (order) {
      response.send(order);
    } else {
      response.status(404).send({ message: "Order Not Found" });
    }
  })
);

orderLinkSetup.put(
  "/:id/pay",
  authorizationCheck,
  expressAsyncHandler(async (request, response) => {
    const order = await Order.findById(request.params.id);
    if (order) {
      order.paymentChecked = true;
      order.paymentData = Date.now();
      order.paymentResult = {
        id: request.body.id,
        status: request.body.status,
        update_time: request.body.update_time,
        email_address: request.body.email_address,
      };

      const updateStatusOrder = await order.save();
      response.send({ message: "Order Paid", order: updateStatusOrder });
    } else {
      response.status(404).send({ message: "Order Not Found" });
    }
  })
);

export default orderLinkSetup;
