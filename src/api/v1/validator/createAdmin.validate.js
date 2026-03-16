const Joi = require("joi");

const createAdminSchema = Joi.object({
        body: Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email",
    "any.required": "Email is required",
  }),

  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must be less than 50 characters",
  }),

  password: Joi.string().min(6).required().messages({
    "any.required": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),

  role: Joi.string()
    .valid("SUPER_ADMIN", "SUB_ADMIN", "MANAGER")
    .required()
    .messages({
      "any.only": "Role must be SUPER_ADMIN, SUB_ADMIN, or MANAGER",
      "any.required": "Role is required",
    }),
}).required(),
 query:Joi.object().unknown(false),
 params:Joi.object().unknown(false)
});

module.exports = createAdminSchema;