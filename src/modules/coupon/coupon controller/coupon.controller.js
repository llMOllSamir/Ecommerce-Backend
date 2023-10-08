import couponModel from "../../../../DB/models/coupon.model.js";
import { find, findOne } from "../../../utils/Handler/reFactor.handler.js";
import handelAsyncError from "../../../utils/middleware/handelAsyncError.js";
import AppError from "../../../utils/services/appError.js";
import cartModel from "./../../../../DB/models/cart.model.js";

// create coupon
let createCoupon = handelAsyncError(async (req, res, next) => {
  let exist = await couponModel.findOne({ coupon: req.body.coupon });
  if (exist) return next(new AppError("coupon name is already exist", 409));
  req.body.createdBy = req.user._id;
  req.body.expiries = new Date(req.body.expiries).getTime();
  let dateNow = new Date().getTime();
  if (req.body.expiries < dateNow)
    return next(new AppError("Invalid Date expiries", 400));
  let newCoupon = new couponModel(req.body);
  await newCoupon.save();
  res.json({ message: "success", coupon: newCoupon });
});

// delete Coupon
let deleteCoupon = handelAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let exist = await couponModel.findById(id);
  if (!exist) return next(new AppError("coupon is not Found", 404));
  if (
    exist.createdBy.toString() === req.user._id.toString() ||
    req.user.role === "admin"
  ) {
    await couponModel.findByIdAndDelete(id);
    res.json({ message: "success" });
  } else {
    return next(new AppError("You not Authorized to Delete Coupon", 403));
  }
});

// update Coupon
let updatedCoupon = handelAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let exist = await couponModel.findById(id);
  if (!exist) return next(new AppError("coupon is not Found", 404));
  if (
    exist.createdBy.toString() === req.user._id.toString() ||
    req.user.role === "admin"
  ) {
    let updated = await couponModel.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.json({ message: "success", updated });
  } else {
    return next(new AppError("You not Authorized to Update Coupon", 403));
  }
});

// get all Coupons
let getAllCoupons = find(couponModel);

// get all Coupons
let getOneCoupon = findOne(couponModel);

// apply  coupon
let applyCoupon = handelAsyncError(async (req, res, next) => {
  let { coupon } = req.body;
  let existCoupon = await couponModel.findOne({ coupon });
  if (!existCoupon) return next(new AppError("Invalid Coupon", 400));
  if (existCoupon.usedBy.includes(req.user._id))
    return next(new AppError("you only can use coupon one time", 400));
  let dateNow = new Date().getTime();
  if (existCoupon.expiries.getTime() < dateNow)
    return next(new AppError("Coupon is expired", 400));
  let cart = await cartModel.findOne({ user: req.user._id });
  if (!cart) return next(new AppError("you don't have cart ", 404));
  existCoupon.usedBy.push(req.user._id);
  await existCoupon.save();
  cart.discount = existCoupon.discount;
  let totalDiscount = (cart.totalPrice * cart.discount) / 100;
  if (totalDiscount > 500) totalDiscount = 500;
  cart.tPAD = cart.totalPrice - totalDiscount;
  await cart.save();
  res.json({ message: "success" });
});

// export  Methods

export {
  createCoupon,
  deleteCoupon,
  updatedCoupon,
  getAllCoupons,
  getOneCoupon,
  applyCoupon,
};
