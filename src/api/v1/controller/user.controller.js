const UserService = require('@services/user.service');
const user_service = new UserService();
const Responses = require('@constant/responses');
const { prisma,handle_prisma_error } = require('@lib/prisma');
const { compare_password, hash_password } = require('@utils/helper');
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
  update_user_profile = async (req, res, next) => {
    const userId=req.user.id
    try {
      const {name,current_password,new_password}=req.body;
      const matching_password=await compare_password(current_password,req.user.password)
      if(!matching_password){
        return res.status(401).json(responses.bad_request_error("password is not matched",null))
      }
      const hashPassword=await hash_password(new_password)
     const user= await prisma.user.update({
        where:{
          id:userId,

        },
        data:{
          name,
          password:hashPassword
        }

      })
      return res.status(200).json(responses.update_success_response(user))
    } catch (error) {
      console.log(error)
      
      next(error)
    }
  };
}

module.exports=UserController
