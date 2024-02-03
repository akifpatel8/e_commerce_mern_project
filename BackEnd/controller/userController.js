const User = require("../models/userModel")
const catchAsyncErrors=require("../ middleware/catchAsyncErrors")
const ErrorHandler = require("../utils/errorHandler")
const sendToken = require("../utils/jwtToken")

//create a user
exports.createUser = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password} = req.body
    const user = await User.create({name,email,password,
        avatar:{
            public_id:"this is a sample id",
            url:"sampleurl.com"
        }
    });
    sendToken(user,200,res)

})   

exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
    const {email,password}= req.body
    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password",400))
    }
    const user = await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",401))
    }
    const isPasswordMatched = user.comparePassword(password)
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401))
    }
    sendToken(user,200,res)
})

exports.logout=catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        sucess:true,
        message:"Logged out"
    })
})