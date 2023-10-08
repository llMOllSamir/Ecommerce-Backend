import { Router } from "express";
import { protectedRoute } from "../../utils/middleware/protected.routes.js";
import {
  createCashOrder,
  createCheckOutOrder,
  getAllOrders,
  getUserOrders,
} from "./controller/order.controller.js";

let orderRouter = Router();

orderRouter.get("/", getAllOrders);
orderRouter.get("/user", protectedRoute, getUserOrders);
orderRouter.post("/:id", protectedRoute, createCashOrder);
orderRouter.post("/checkout-session/:id", protectedRoute, createCheckOutOrder);

export default orderRouter;
