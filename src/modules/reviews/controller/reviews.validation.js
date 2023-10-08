import joi from "joi";

let addReview = joi
  .object({
    comment: joi.string().required().min(3).max(300),
    product: joi.string().required().hex().length(24),
    rating: joi.number().required().min(1).max(5),
  })
  .unknown(true);

let updateReview = joi
  .object({
    comment: joi.string().optional().min(3).max(300),
    rating: joi.number().optional().min(1).max(5),
  })
  .unknown(true);

export { addReview, updateReview };
