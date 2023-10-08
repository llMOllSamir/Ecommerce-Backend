import Joi from "joi";

let addSchema = Joi.object({
  name: Joi.string().required().min(3).max(30),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: ["com"] }, minDomainSegments: 2 }),
  password: Joi.string()
    .pattern(/^#[A-Za-z0-9]{5,15}$/)
    .required(),
  rePassword: Joi.string().required().valid(Joi.ref("password")),
  age: Joi.number().min(18).required(),
  phone: Joi.string()
    .optional()
    .pattern(/^[0-9]+$/),
  role:Joi.string().optional().pattern(/^admin|user$/),
});

let idSchema = Joi.object({
  id: Joi.string().hex().required().length(24),
});

let changePasswordSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: ["com"] }, minDomainSegments: 2 }),
  password: Joi.string().required(),
});

export { addSchema, idSchema, changePasswordSchema };
