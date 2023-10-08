import AppError from "../services/appError.js";

export let validation = (schema) => {
  return (req, res, next) => {
    let { error } = schema.validate(
      { ...req.query, ...req.params, ...req.body },
      { abortEarly: false }
    );
    if (error) {
      let errors = error.details.map((ele) => ele.message.replace(/\"/gi, ""));
      return next(new AppError(errors, 400));
    }
    next();
  };
};
