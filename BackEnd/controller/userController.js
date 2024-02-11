const User = require("../models/userModel")
const catchAsyncErrors=require("../ middleware/catchAsyncErrors")
const ErrorHandler = require("../utils/errorHandler")
const sendToken = require("../utils/jwtToken")
const crypto = require("crypto")
const sendEmail = require("../utils/sendEmail")
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

//login user
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

//logout user
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

//forgot password
exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return next(new ErrorHandler("User not found",404))
    }

    //get ResetPassword token
    const resetToken = await user.getResetPasswordToken()
    await user.save({validateBeforeSave:false})
    const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
    console.log('✌️resetPasswordUrl --->', resetPasswordUrl);
    const message = `your password reset token is : \n \n ${resetPasswordUrl} \n \n  if you have not requested this email then, please ignore it `
    try {
        await sendEmail({
            email:user.email,
            subject:"Ecommerce Password Recovery",
            message
        })
        res.status(200).json({
            sucess:true,
            message:`Email sent to ${user.email} successfully`
        })
    } catch (error) {
       user.resetPasswordToken=undefined
       user.resetPasswordExpire=undefined
       await user.save({validateBeforeSave:false})
       return next(new ErrorHandler(error.message,501))
       
    }  
})

exports.resetPassowrd = catchAsyncErrors(async(req,res,next)=>{
    const token = req.params.token
    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex")
    const user=await User.findOne({resetPasswordToken:resetPasswordToken,resetPasswordExpire:{ $gt : Date.now() }})
    if(!user){
        return next(new ErrorHandler("Reset password is invalid or the token has been expired ",400))
    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("password does not match",400))
    }
    user.password=req.body.password
    user.resetPasswordToken=undefined
    user.resetPasswordExpire=undefined
    await user.save({validateBeforeSave:false})
    sendToken(user,200,res) 
})