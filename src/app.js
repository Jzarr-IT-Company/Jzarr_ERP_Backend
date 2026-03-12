const express = require('express');
const app = express();
const { errorLogger, requestLogger } = require('./config/express.winston.logger.js');
const { globalErrorMiddleware } = require('./api/v1/middleware/globalError.middleware.js');
const rootRouter = require('../src/api/v1/routes/root.routes.js');
const cors = require('cors');
app.use(express.json({ limit: '16mb' }));

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  })
);
app.use(requestLogger);

app.get('/health-check', (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: 'server is running up !!!',
  });
});

app.use('/api/v1', rootRouter);

app.use(globalErrorMiddleware);
app.use(errorLogger);

module.exports = app;
