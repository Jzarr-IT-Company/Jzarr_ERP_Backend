const Joi = require('joi');



const loginSchema = Joi.object({
    body: Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please enter a valid email',
    'any.required': 'Email is required',
  }),

  password: Joi.string().required().messages({
    'any.required': 'Password is required',
  }),
 }).required(),
 query:Joi.object().unknown(false),
 params:Joi.object().unknown(false)
});

module.exports = loginSchema;
