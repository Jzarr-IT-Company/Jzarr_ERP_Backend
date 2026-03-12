const authRouter=require("express").Router()
const AuthController=require("../controller/auth.controller")
const auth_controller=new AuthController()

authRouter.post("/login",auth_controller.login)

module.exports=authRouter