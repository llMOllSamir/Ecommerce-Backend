import { Router } from "express";
import { protectedRoute } from "../../utils/middleware/protected.routes.js";
import * as cartController from "./controller/cart.controller.js";

let cartRouter = Router();

cartRouter
  .route("/")
  .get(protectedRoute, cartController.getUserCart)
  .post(protectedRoute, cartController.addToCart);

cartRouter
  .route("/:id")
  .delete(protectedRoute, cartController.deleteCart)
  .put(protectedRoute, cartController.updateProductQuantity)
  .patch(protectedRoute, cartController.removeCartItem);

export default cartRouter;
