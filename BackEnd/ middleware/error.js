const ErrorHandler=require("../utils/errorHandler")

module.exports=(err, req, res, next)=>{
    err.statusCode=err.statusCode || 500
    err.message=err.message || "Internal Server Error"
    //wrong id error
    if(err.name === "CastError"){
        const message=`Resource not found. Invalid ,${err.path}`
        err=new ErrorHandler(message,400)
    }
    //mongoose duplicate error
    if(err.code === 11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} entered`
        err=new ErrorHandler(message,400)
    }
    //wrong JWT token
    if(err.name === "JsonWebTokenError"){
        const message=`Json web token is invalid, Try again`
        err=new ErrorHandler(message,400)
    }
    //wrong JWT expire error
    if(err.name === "TokenExpiredError"){
        const message=`Json web token is Expired, Try again`
        err=new ErrorHandler(message,400)
    }
    res.status( err.statusCode).json({
        success:false,
        message:err.message
    })
} 