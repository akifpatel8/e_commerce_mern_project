const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

//this function is used check if user is logged in or not
exports.isAuthenticatedUser=async(req,res,next)=>{
    const {token}=req.cookies
    if(!token){
        return next(new ErrorHandler("login to access this resource",401))
    }
    const {id} = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.findById(id)
    next()
}

//this function is used check if user has permisson to access this page or resource
exports.authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role : ${req.user.role} is not allowed to access the resource`,403))
        }
        next()
    }
}