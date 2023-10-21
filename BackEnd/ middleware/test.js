const ErrorHandler=require("../utils/errorHandler")

module.exports=(err,req, res, next)=>{
    console.log(typeof next, "<--- tyof next");
    err.statusCode=err.statusCode || 500
    err.message=err.message || "Internal Server Error"
    next("t",400)
    res.status( err.statusCode).json({
        success:false,
        message:"testing"
    })
}