const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, '../../.env'),
});

module.exports = {
  PORT: process.env.PORT || 3001,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};
