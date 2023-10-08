import AppError from "../services/appError.js";

let handelAsyncError = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      next(new AppError(err.message, 500));
    });
  };
};
export default handelAsyncError;
