import handelAsyncError from "../../utils/middleware/handelAsyncError.js";
import AppError from "../../utils/services/appError.js";
import userModel from "./../../../DB/models/user.model.js";

let addWish = handelAsyncError(async (req, res, next) => {
  let { product } = req.params;
  if (req.user.wishList && req.user.wishList.length > 25)
    return next(new AppError("you used your limit wishlist", 409));
  await userModel.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { wishList: product },
    },
    { new: true }
  );
  res.json({ message: "success" });
});

let deleteWish = handelAsyncError(async (req, res, next) => {
  let { product } = req.params;
  await userModel.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { wishList: product },
    },
    { new: true }
  );
  res.json({ message: "success" });
});

let getWishList = handelAsyncError(async (req, res, next) => {
  let { wishList } = await userModel.findById(req.user._id);
  res.json({ message: "success", wishList });
});

export { addWish, deleteWish, getWishList };
