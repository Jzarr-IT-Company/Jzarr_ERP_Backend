const prisma = require('@lib/prisma');
const UserService = require('@services/user.service');
const user_services = new UserService();
const Responses = require('@constant/responses');
const { compare_password, generate_token } = require('@utlls/helper');
const responses = new Responses();


class AuthController{
 login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    const existingUser = await user_services.find_user_by_email(email);

    if (!existingUser) {
      return res.json(responses.bad_request_error('user doesnot exist', null));
    }

    if (existingUser.role !== role) {
      return res.json(responses.bad_request_error('Invalid role', null));
    }


    const matchedPassword=await compare_password(password,existingUser.password)
    if(!matchedPassword){
        return res.json(responses.bad_request_error("Invlaid credentials"))
    }


    const token=await generate_token(existingUser.id)

    // return res.json(responses.ok_response({existingUser,token},"user logged in successfully"))

    const isMatch = password === existingUser.password;

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    return res.json({
      message: 'Login successful',
      user: existingUser,
    });
  } catch (error) {
    console.log(error)
    next(error);
  }
};
}



