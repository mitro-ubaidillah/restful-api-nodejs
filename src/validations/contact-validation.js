import Joi from "joi"

const createContactValidation = Joi.object({
    firstName: Joi.string().max(100).required().min(4),
    lastName: Joi.string().max(100).optional().min(4),
    email: Joi.string().max(100).optional(),
    phone: Joi.string().max(20).min(5).optional()
});

const getContactValidation = Joi.number().positive().required();

const updateContactValidation = Joi.object({
    id: Joi.number().positive().required(),
    firstName: Joi.string().max(100).required().min(4),
    lastName: Joi.string().max(100).optional().min(4),
    email: Joi.string().max(100).optional(),
    phone: Joi.string().max(20).min(5).optional()
});

const contactSearchValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    phone: Joi.string().optional(),
});

export {
    createContactValidation,
    getContactValidation,
    updateContactValidation,
    contactSearchValidation
};