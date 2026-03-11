const Responses=require("@constant/responses")

const responses=new Responses()


const globalErrorMiddleware=(err,req,res,next)=>{
    const errMsg=err.message ?? "Something went wrong"
    const statusCode=err.status ?? 500
    return res.json(responses.generic_error(statusCode,errMsg))
}


module.exports={
    globalErrorMiddleware
}