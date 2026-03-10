const express = require('express');
const app = express();
const { errorLogger, requestLogger } = require('./config/express.winston.logger.js');
app.use(express.json({ limit: '16mb' }));

app.use(requestLogger);

app.get('/health-check', (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: 'server is running up !!!',
  });
});

app.use(errorLogger);

module.exports = app;
