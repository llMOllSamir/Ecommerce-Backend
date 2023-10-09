import { customAlphabet } from "nanoid";
import orderModel from "../../../../DB/models/order.model.js";
import handelAsyncError from "../../../utils/middleware/handelAsyncError.js";
import AppError from "../../../utils/services/appError.js";
import cartModel from "./../../../../DB/models/cart.model.js";
import productModel from "./../../../../DB/models/product.model.js";
import Stripe from "stripe";
import userModel from "../../../../DB/models/user.model.js";
const stripe = new Stripe(
  "sk_test_51Nz42NAt85p8dhi11gcjbysd4OlKc8GqDD9Ix4899Dc6tqoHNvNSUj4GUbNMCkHqaLIkkawBJqjHwPFyLUX4N0Ak00kuevTLda"
);

const nanoid = customAlphabet("123456789", 10);

// create cash order
let createCashOrder = handelAsyncError(async (req, res, next) => {
  // get cart with id
  let cart = await cartModel.findById(req.params.id);
  if (!cart) return next(new AppError("cart not found", 404));
  // create order
  let order = new orderModel({
    user: req.user._id,
    cartItems: cart.cartItems,
    shippingAddress: req.body.shippingAddress,
    totalPrice: cart.tPAD,
    orderId: nanoid(8),
  });
  await order.save();
  //  update product
  if (order) {
    let option = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { sold: item.quantity, quantity: -item.quantity } },
      },
    }));
    await productModel.bulkWrite(option);
  }
  //   delete cart
  await cartModel.findByIdAndDelete(cart._id);
  res.json({ message: "success", order });
});

// get user order
let getUserOrders = handelAsyncError(async (req, res, next) => {
  let allOrders = await orderModel
    .find({ user: req.user._id })
    .populate("cartItems.product");
  res.json({ message: "success", allOrders });
});

// get all orders
let getAllOrders = handelAsyncError(async (req, res, next) => {
  let allOrders = await orderModel.find().populate("cartItems.product");
  res.json({ message: "success", allOrders });
});

// create CheckOut Order
let createCheckOutOrder = handelAsyncError(async (req, res, next) => {
  // get cart with id
  let cart = await cartModel.findById(req.params.id);
  if (!cart) return next(new AppError("cart not found", 404));
  //   create checkOut
  let success_url = `${req.protocol}://${req.get("host")}/allOrder`;
  let cancel_url = `${req.protocol}://${req.get("host")}/cart`;
  let session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "egp",
          unit_amount: cart.tPAD * 100,
          product_data: {
            name: req.user.name,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url,
    cancel_url,
    customer_email: req.user.email,
    client_reference_id: req.params.id,
    metadata: req.body,
  });
  res.json({ message: "success", session });
});

//online Order confirm
let onlineOrder = handelAsyncError(async (req, res, next) => {
  const sig = req.headers["stripe-signature"].toString();
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      "whsec_mF0ApHWVtM0XQsagxpxWigYKsp1Hc1IK"
    );
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
  // Handle the event
  if (event.type == "checkout.session.completed") {
    const checkoutSessionCompleted = event.data.object;
    // get cart with id
    let cart = await cartModel.findById(
      checkoutSessionCompleted.client_reference_id
    );
    if (!cart) return next(new AppError("cart not found", 404));
    let user = await userModel.findOne({
      email: checkoutSessionCompleted.customer_email,
    });
    // create order
    let order = new orderModel({
      user: user._id,
      cartItems: cart.cartItems,
      shippingAddress: checkoutSessionCompleted.metadata.shippingAddress,
      totalPrice: cart.tPAD,
      paymentMethod: "card",
      isPaid: true,
      orderId: nanoid(8),
    });
    await order.save();
    //  update product
    if (order) {
      let option = cart.cartItems.map((item) => ({
        updateOne: {
          filter: { _id: item.product },
          update: { $inc: { sold: item.quantity, quantity: -item.quantity } },
        },
      }));
      await productModel.bulkWrite(option);
    }
    //   delete cart
    await cartModel.findByIdAndDelete(cart._id);
    return res.json({ message: "success", order });
  } else {
    return next(new AppError("error payment", 400));
  }
});

export {
  createCashOrder,
  getUserOrders,
  getAllOrders,
  createCheckOutOrder,
  onlineOrder,
};
