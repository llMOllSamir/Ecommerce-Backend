import reviewsModel from "../../../../DB/models/reviews.model.js";
import { find, findOne } from "../../../utils/Handler/reFactor.handler.js";
import handelAsyncError from "../../../utils/middleware/handelAsyncError.js";
import AppError from "../../../utils/services/appError.js";
import productModel from "./../../../../DB/models/product.model.js";

//  get all reviews
let getAllReviews = find(reviewsModel);
//  get one review
let getOneReview = findOne(reviewsModel);

// add review
let addReview = handelAsyncError(async (req, res, next) => {
  let existReview = await reviewsModel.findOne({
    user: req.user._id,
    product: req.body.product,
  });
  if (existReview) return next(new AppError("you already have Review", 409));
  let existProduct = await productModel.findOne({ _id: req.body.product });
  if (!existProduct) return next(new AppError("No Product Founded", 404));
  req.body.user = req.user._id;
  let newReview = new reviewsModel(req.body);
  await newReview.save();
  let productReviewed = await reviewsModel.find({ product: req.body.product });
  let avgRating = sumAvg(productReviewed);
  existProduct.ratingsAverage = avgRating;
  await existProduct.save();
  res.json({ message: "success" });
});

// delete Review
let deleteReview = handelAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let exist = await reviewsModel.findById(id);
  if (!exist) return next(new AppError("review Already Deleted", 404));

  if (
    exist.user.toString() !== req.user._id.toString() ||
    req.user.role !== "admin"
  )
    return next(new AppError("You not Authorized to Delete This Review", 404));
  let deleted = await reviewsModel.findByIdAndDelete(id);
  let productReviewed = await reviewsModel.find({ product: deleted.product });
  let avgRating = sumAvg(productReviewed);
  await productModel.findByIdAndUpdate(deleted.product, {
    ratingsAverage: avgRating,
  });
  res.json({ message: "success" });
});

// Update Review
let updateReview = handelAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let exist = await reviewsModel.findById(id);
  if (!exist) return next(new AppError("review Not Found", 404));
  if (exist.user.toString() !== req.user._id.toString())
    return next(new AppError("You not Authorized to Update This Review", 404));
  let updated = await reviewsModel.findByIdAndUpdate(id, req.body);
  if (req.body.rating) {
    let productReviewed = await reviewsModel.find({ product: updated.product });
    let avgRating = sumAvg(productReviewed);
    await productModel.findByIdAndUpdate(updated.product, {
      ratingsAverage: avgRating,
    });
  }
  res.json({ message: "success" });
});

// export Methods
export { getAllReviews, getOneReview, addReview, deleteReview, updateReview };

// calc avg for product
let sumAvg = (arr) => {
  if (arr.length === 0) return 1;
  let productAvg = arr.map((review) => review?.rating);
  let sum = productAvg.reduce((sum, value) => sum + value);
  let avg = sum / productAvg.length;
  if (avg > 5) avg = 5;
  return avg;
};
