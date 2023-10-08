import {
  deleteOne,
  find,
  findOne,
} from "../../../utils/Handler/reFactor.handler.js";
import {
  destroyOne,
  uploadOne,
} from "../../../utils/cloudinary/fileUploader.js";
import handelAsyncError from "../../../utils/middleware/handelAsyncError.js";
import AppError from "../../../utils/services/appError.js";
import userModel from "./../../../../DB/models/user.model.js";

// get all users
let getAllUsers = find(userModel);

// get one user
let getOneUser = findOne(userModel);

// add user
let addUser = handelAsyncError(async (req, res, next) => {
  let isExist = await userModel.findOne({ email: req.body.email });
  if (isExist) return next(new AppError("Email is already Exist", 409));
  let newUser = new userModel(req.body);
  await newUser.save();
  res.json({ message: "success", newUser }).status(201);
});

// delete user
let deleteUser = deleteOne(userModel, "user");

// update user
let updateUser = handelAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let exist = await userModel.findById(id);
  if (!exist) return next(new AppError("User is Not Found", 404));
  if (req.body.password)
    return next(
      new AppError("You Have To call Services to Change this password", 403)
    );
  let updated = await userModel.findByIdAndUpdate(id, req.body, { new: true });
  res.json({ message: "success", data: updated });
});

// change Password
let changePassword = handelAsyncError(async (req, res, next) => {
  let { email, password } = req.body;
  let userExist = await userModel.findOne({ email });
  if (!userExist)
    return next(new AppError("user is not exist or Wrong Email", 404));
  await userModel.findOneAndUpdate(
    { email },
    { password, changePasswordAt: new Date() }
  );
  res.json({ message: "success" });
});

// Block User
let blockUser = handelAsyncError(async (req, res, next) => {
  let { id } = req.params;
  await userModel.findByIdAndUpdate(id, { blocked: true });
  res.json({ message: "success" });
});

// image upload
let imageUpload = handelAsyncError(async (req, res, next) => {
  let image;
  if (req.user.image && req.file) {
    await destroyOne(req.user.image.public_id);
  }
  if (req.file) {
    image = await uploadOne(req.file, "users/" + req.user.name);
  }
  await userModel.findByIdAndUpdate(req.user._id, { image });
});

// export Methods
export {
  getAllUsers,
  addUser,
  deleteUser,
  getOneUser,
  updateUser,
  changePassword,
  blockUser,
  imageUpload,
};
