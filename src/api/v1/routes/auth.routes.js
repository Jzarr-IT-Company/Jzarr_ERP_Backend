const authRouter = require('express').Router();
const { validationSchema } = require('@middleware/validation.middleware');
const AuthController = require('../controller/auth.controller');
const loginSchema = require('@validator/login.validate');
const auth_controller = new AuthController();

authRouter.post('/login', validationSchema(loginSchema), auth_controller.login);

module.exports = authRouter;
