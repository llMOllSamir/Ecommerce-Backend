import Joi from "joi";

let signIn = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ["com"] }, minDomainSegments: 2 })
    .required(),
  password: Joi.string()
    .required()
    .pattern(/^#[A-Za-z0-9]{5,15}$/),
});

let signUp = Joi.object({
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
});

let email = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ["com"] }, minDomainSegments: 2 })
    .required(),
});
let reset = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ["com"] }, minDomainSegments: 2 })
    .required(),
  resetCode: Joi.string().required().length(6),
  password: Joi.string()
    .pattern(/^#[A-Za-z0-9]{5,15}$/)
    .required(),
  rePassword: Joi.string().required().valid(Joi.ref("password")),
});

let updatePassword = Joi.object({
  currentPassword: Joi.string()
    .pattern(/^#[A-Za-z0-9]{5,15}$/)
    .required(),
  password: Joi.string()
    .pattern(/^#[A-Za-z0-9]{5,15}$/)
    .required(),
  rePassword: Joi.string().required().valid(Joi.ref("password")),
});

let updateData = Joi.object({
  name: Joi.string().optional().min(3).max(30),
  age: Joi.number().min(18).optional(),
  phone: Joi.string()
    .optional()
    .pattern(/^[0-9]+$/),
}).unknown(true);
export { signIn, signUp, email, reset, updatePassword, updateData };
