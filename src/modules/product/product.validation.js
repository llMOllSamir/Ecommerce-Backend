import joi from "joi";

let addSchema = joi
  .object({
    title: joi.string().required().min(2).max(30),
    description: joi.string().required().min(10).max(300),
    price: joi.number().required().min(0),
    quantity: joi.number().min(0),
    category: joi.string().hex().length(24),
    subCategory: joi.string().hex().length(24),
    brand: joi.string().hex().length(24),
  })
  .unknown(true);

let updateSchema = joi
  .object({
    id: joi.string().hex().length(24).required(),
    name: joi.string().min(2).max(30),
    description: joi.string().min(2).max(30),
    price: joi.number().min(0),
    category: joi.string().hex().length(24),
    subCategory: joi.string().hex().length(24),
    brand: joi.string().hex().length(24),
  })
  .unknown(true);

let deleteSchema = joi.object({
  id: joi.string().hex().length(24),
});

export { addSchema, deleteSchema, updateSchema };
