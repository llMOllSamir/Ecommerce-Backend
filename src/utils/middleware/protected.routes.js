import userModel from "../../../DB/models/user.model.js";
import AppError from "../services/appError.js";
import handelAsyncError from "./handelAsyncError.js";
import jwt from "jsonwebtoken";

// Protect Routes Validation
let protectedRoute = handelAsyncError(async (req, res, next) => {
  let { token } = req.headers;
  // check Token exist
  if (!token) return next(new AppError("Token not Found", 404));
  // check Verified Token
  let decoded = jwt.verify(token, process.env.SECRETE_KEY, (err, decoded) => {
    if (err) return next(new AppError("invalid Token", 400));
    return decoded;
  });
  // check if user exist
  let user = await userModel.findById(decoded.userId);
  if (!user) return next(new AppError("user is not exist", 404));
  // check validate Password Time
  if (user.changePasswordAt) {
    let changedPassword = parseInt(user.changePasswordAt.getTime() / 1000);
    // compare between change password time and last login after changed
    if (changedPassword > decoded.iat)
      return next(new AppError("You must sign In", 403));
  }
  req.user = user;
  next();
});

// Authorization
let allowTo = (...roles) => {
  return (req, res, next) => {
    // check if user allowed
    if (!roles.includes(req.user.role))
      return next(new AppError("You not authorized", 403));
    next();
  };
};

// export Methods
export { allowTo, protectedRoute };
