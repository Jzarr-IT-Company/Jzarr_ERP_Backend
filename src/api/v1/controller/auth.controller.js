const{ prisma} = require('@lib/prisma');
const UserService = require('@services/user.service');
const user_services = new UserService();
const Responses = require('@constant/responses');
const { compare_password, generate_token } = require('@utils/helper');
const responses = new Responses();


// http://localhost:5173/contracts
class AuthController {
  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const existingUser = await user_services.find_user_by_email(email);

      if (!existingUser) {
        return res.status(400).json(responses.bad_request_error('user doesnot exist', null));
      }

      

      const matchedPassword = await compare_password(password, existingUser.password);
      if (!matchedPassword) {
        return res.status(401).json(responses.bad_request_error('Invlaid credentials'));
      }

      const token = await generate_token(existingUser.id);
      delete existingUser.password
      return res.status(200).json(
        responses.ok_response({ user:existingUser, token }, 'user logged in successfully')
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  // change_password=async(req,res,next){
  //   try {
  //     const userId=req.user.id;



  //     const {current_password,new_password}=req.body;
  //     await prisma.user.update({
  //       where:{
  //         id:userId,
  //       },
  //       data:{
          
  //       }
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
}


module.exports=AuthController