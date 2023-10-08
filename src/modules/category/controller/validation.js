import joi from "joi";

let addSchema = joi.object({
  name: joi.string().required().min(2).max(30),
});

let updateSchema = joi.object({
  id: joi.string().hex().length(24),
  name:joi.string().required().min(2).max(30),
});

let deleteSchema = joi.object({
  id: joi.string().hex().length(24),
});

 
export { addSchema, deleteSchema, updateSchema };
