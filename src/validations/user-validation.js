import Joi from "joi";

const registerUserValidation = Joi.object({
   username: Joi.string().required().max(100).min(4),
   // password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6, 100}$')),
   password: Joi.string().max(100).min(6).required(),
   name: Joi.string().max(100).min(4).required()
});

const loginUserValidation = Joi.object({
   username: Joi.string().required().max(100).min(4),
   password: Joi.string().required().max(100).min(6),
});

const getUserValidation = Joi.string().required().max(100).min(4);

const updateUserValidation = Joi.object({
   username: Joi.string().max(100).min(4).required(),
   password: Joi.string().optional().min(6).max(100),
   name: Joi.string().optional().min(4).max(100),
})

export {
   registerUserValidation,
   loginUserValidation,
   getUserValidation,
   updateUserValidation
}