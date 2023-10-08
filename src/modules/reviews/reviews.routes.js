import { Router } from "express";
import * as reviewController from "./controller/reviews.controller.js";
import { protectedRoute } from "../../utils/middleware/protected.routes.js";
import { validation } from "./../../utils/middleware/validator.js";
import { addReview, updateReview } from "./controller/reviews.validation.js";

let reviewsRouter = Router();

reviewsRouter
  .route("/")
  .get(reviewController.getAllReviews)
  .post(protectedRoute, validation(addReview), reviewController.addReview);

reviewsRouter
  .route("/:id")
  .get(reviewController.getOneReview)
  .put(protectedRoute, validation(updateReview), reviewController.updateReview)
  .delete(protectedRoute, reviewController.deleteReview);

export default reviewsRouter;
