const bcrypt = require('bcrypt');
const { JWT_SECRET_KEY } = require('@config/env.config');
const jwt = require('jsonwebtoken');

async function hash_password(password) {
  return await bcrypt.hash(password, 10);
}

function compare_password(password, userpassword) {
  return bcrypt.compare(password, userpassword);
}

function generate_token(user_id) {
  return jwt.sign({ id: user_id }, JWT_SECRET_KEY, { expiresIn: '7d' });
}

function decoded_token(token) {
  return jwt.verify(token, JWT_SECRET_KEY);
}

function pagination(req) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip
  };
}


module.exports = {
  generate_token,
  decoded_token,
  hash_password,
  compare_password,
   pagination
};
