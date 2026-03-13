const user_router=require("express").Router()
const UserController=require("@controller/user.controller")
const user_controller=new UserController()



user_router.get("/",user_controller.get_user_profile)
user_router.patch("/",user_controller.update_user_profile)




module.exports=user_router