import handelAsyncError from "../../utils/middleware/handelAsyncError.js";
import AppError from "../../utils/services/appError.js";
import userModel from "../../../DB/models/user.model.js";

let addAddress = handelAsyncError(async (req, res, next) => {
  let { product } = req.params;
  if (req.user.wishList && req.user.wishList.length > 25)
    return next(new AppError("you used your limit wishlist", 409));
  let { address } = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { address: req.body },
    },
    { new: true }
  );
  res.json({ message: "success", address });
});

let deleteAddress = handelAsyncError(async (req, res, next) => {
  let { id } = req.params;
  await userModel.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { address: { _id: id } },
    },
    { new: true }
  );
  res.json({ message: "success" });
});

export { addAddress, deleteAddress };
