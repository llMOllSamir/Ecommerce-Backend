import userModel from "../../../../DB/models/user.model.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import handelAsyncError from "../../../utils/middleware/handelAsyncError.js";
import AppError from "../../../utils/services/appError.js";
import { resetPass, sendEmail } from "../../../email/email.js";
import { nanoid } from "nanoid";
import { uploadOne } from "../../../utils/cloudinary/fileUploader.js";

// sign in
let signIn = handelAsyncError(async (req, res, next) => {
  let { email, password } = req.body;
  let exist = await userModel.findOne({ email });
  //  check if user found
  if (!exist) return next(new AppError("you have to register first", 401));
  //  check if user password matched
  let matchPassword = bcrypt.compareSync(password, exist.password);
  if (!matchPassword) return next(new AppError("Wrong Password", 401));
  //  check if user get blocked
  if (exist.blocked)
    return next(new AppError("this account is blocked from the owner", 403));
  //  check if user active
  if (!exist.active)
    return next(
      new AppError("this account is not active back to customer services", 403)
    );
  //  check if user verify his acc
  if (!exist.confirmEmail)
    return next(new AppError("please verify your email first", 403));
  //  create token
  let token = Jwt.sign(
    {
      userId: exist._id,
      name: exist.name,
      image: exist.image || "",
      role: exist.role,
    },
    process.env.SECRETE_KEY
  );
  //   response
  res.json({ message: "success", token });
});

// sign up
let signUp = handelAsyncError(async (req, res, next) => {
  let exist = await userModel.findOne({ email: req.body.email });
  if (exist) return next(new AppError("Email is Already exist", 409));
  if (req.file) {
    req.body.image = await uploadOne(req.file, "users/" + req.body.name);
  }
  let newUser = new userModel(req.body);
  let token = Jwt.sign(
    { id: newUser._id, email: newUser.email },
    process.env.SECRETE_KEY
  );
  sendEmail(newUser.email, token);
  await newUser.save();
  res.json({ message: "success" }).status(201);
});

// confirmEmail
let confirmEmail = handelAsyncError(async (req, res, next) => {
  let { token } = req.params;
  let decoded = Jwt.verify(token, process.env.SECRETE_KEY);
  let verified = await userModel.findOne({ email: decoded.email });
  if (verified && verified.confirmEmail)
    return next(
      new AppError("You Already Confirmed Your Email Please Log in", 409)
    );

  await userModel.findByIdAndUpdate(decoded.id, {
    confirmEmail: true,
  });
  res.json({ message: "success" });
});

// forgot password
let forgotPassword = handelAsyncError(async (req, res, next) => {
  let { email } = req.body;
  let exist = await userModel.findOne({ email });
  if (!exist)
    return next(new AppError("User is Not Exist please sign up", 404));
  let code = nanoid(6);
  resetPass(email, code);
  await userModel.findByIdAndUpdate(exist._id, { resetCode: code });
  res.json({ message: "success" });
});

// reset password with the code reset
let resetPassword = handelAsyncError(async (req, res, next) => {
  let { email, password, resetCode } = req.body;
  let finded = await userModel.findOne({ email });
  if (!finded)
    return next(new AppError("User is Not Exist please sign up", 404));
  if (finded.resetCode !== resetCode)
    return next(new AppError("Reset Code Is Invalid", 400));
  await userModel.findOneAndUpdate(
    { email },
    { password, resetCode: null, changePasswordAt: new Date() }
  );
  res.json({ message: "success" });
});

// update password
let updatePassword = handelAsyncError(async (req, res, next) => {
  let match = bcrypt.compareSync(req.body.currentPassword, req.user.password);
  if (!match) return next(new AppError("Current Password Invalid", 400));
  await userModel.findOneAndUpdate(
    { _id: req.user._id },
    { password: req.body.password, changePasswordAt: new Date() }
  );
  res.json({ message: "success" });
});

// update user data
let updateData = handelAsyncError(async (req, res, next) => {
  if (req.body.password)
    return next(new AppError("You Can't Change Password from here", 403));
  if (req.body.email)
    return next(new AppError("You Can't Change Your Email", 403));
  await userModel.findByIdAndUpdate(req.user._id, req.body);
  res.json({ message: "success" });
});

// export methods

export {
  signIn,
  signUp,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateData,
  confirmEmail,
};
