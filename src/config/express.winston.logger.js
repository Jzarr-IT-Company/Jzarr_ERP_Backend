const expressWinston=require("express-winston")
const logger=require("./winston")

const requestLogger=expressWinston.logger({
    winstonInstance:logger,
    msg:"HTTP {{req.method}} {{req.url}}",
    colorize:true,
    meta:true,
    expressFormat:true,
    ignoredRoutes:(req,res)=>false
})


const errorLogger=expressWinston.logger({
    winstonInstance:logger
})

module.exports={requestLogger,errorLogger}