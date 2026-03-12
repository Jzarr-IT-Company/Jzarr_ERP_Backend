const rootRouter = require('express').Router();

const Responses = require('@constant/responses');
const authRouter = require('./auth.routes');
const responses = new Responses();

rootRouter.use("/auth",authRouter)
rootRouter.use((req, res) => {
  return res.json(responses.not_found_error('This route not exist'));
});

module.exports = rootRouter;
