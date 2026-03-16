const prisma = require('@lib/prisma');
const { decoded_token } = require('@utils/helper');
const jwt = require('jsonwebtoken');
const UserService = require('@services/user.service');
const user_service = new UserService();
const Responses = require('@constant/responses');
const responses = new Responses();
const Authenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Authorization header missing',
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.json(responses.unauthorized_error('token is not available'));
    }

    const decoded = await decoded_token(token);
    const user = await user_service.find_user_by_id(decoded.id);
    if (!user) {
      return res.json(responses.unauthorized_error('Un-Authorized'));
    }
    req.user = user;

    next();
  } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json(
        responses.unauthorized_error('Invalid token')
      );
    }
    
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json(
        responses.unauthorized_error('Token has expired')
      );
    }

    console.log("error in auth middleware :: ", error.message);
    next(error);
  }
};

const verifyRole = (roles = []) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        return res.json(
          responses.forbidden_response('You do not have permission to access this resource.')
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { Authenticated, verifyRole };
