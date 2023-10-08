import { customAlphabet } from "nanoid";
import orderModel from "../../../../DB/models/order.model.js";
import handelAsyncError from "../../../utils/middleware/handelAsyncError.js";
import AppError from "../../../utils/services/appError.js";
import cartModel from "./../../../../DB/models/cart.model.js";
import productModel from "./../../../../DB/models/product.model.js";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51Nz42NAt85p8dhi11gcjbysd4OlKc8GqDD9Ix4899Dc6tqoHNvNSUj4GUbNMCkHqaLIkkawBJqjHwPFyLUX4N0Ak00kuevTLda"
);

const nanoid = customAlphabet("123456789", 10);

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

let getUserOrders = handelAsyncError(async (req, res, next) => {
  let allOrders = await orderModel
    .find({ user: req.user._id })
    .populate("cartItems.product");
  res.json({ message: "success", allOrders });
});

let getAllOrders = handelAsyncError(async (req, res, next) => {
  let allOrders = await orderModel.find().populate("cartItems.product");
  res.json({ message: "success", allOrders });
});

let createCheckOutOrder = handelAsyncError(async (req, res, next) => {
  // get cart with id
  let cart = await cartModel.findById(req.params.id);
  if (!cart) return next(new AppError("cart not found", 404));
  //   create checkOut
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
    success_url: "https://mohamed-elshami.vercel.app/",
    cancel_url: "https://e-commerce-gray-alpha.vercel.app/",
    customer_email: req.user.email,
    client_reference_id: cart._id,
    metadata: req.body.shippingAddress,
  });
  res.json({ message: "success", session });
});

export { createCashOrder, getUserOrders, getAllOrders, createCheckOutOrder };
