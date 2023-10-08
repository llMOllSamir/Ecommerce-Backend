import { Router } from "express";
import {
  allowTo,
  protectedRoute,
} from "../../utils/middleware/protected.routes.js";
import * as couponController from "./coupon controller/coupon.controller.js";

let couponRouter = Router();

couponRouter
  .route("/")
  .get(couponController.getAllCoupons)
  .post(
    protectedRoute,
    allowTo("seller", "admin"),
    couponController.createCoupon
  )
  .put(protectedRoute, couponController.applyCoupon);

couponRouter
  .route("/:id")
  .get(couponController.getOneCoupon)
  .delete(
    protectedRoute,
    allowTo("seller", "admin"),
    couponController.deleteCoupon
  )
  .patch(
    protectedRoute,
    allowTo("seller", "admin"),
    couponController.updatedCoupon
  );

export default couponRouter;
