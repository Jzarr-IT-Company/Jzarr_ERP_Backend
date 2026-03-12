const UserService = require('@services/user.service');
const user_service = new UserService();
const Responses = require('@constant/responses');
const responses = new Responses();

class UserController {
  get_user_profile = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const user = await user_service.find_user_by_id(userId);
      delete user.password;
      return res.json(responses.ok_response(user, 'user get profile successfully'));
    } catch (error) {
      console.log(error);
      next(error);
    } 
  };
  update_user_profile = async (req, res, next) => {};
}
