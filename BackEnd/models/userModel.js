const mongoose = require("mongoose")
const validator = require("validator")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your Name"],
        maxLength: [30, "Name Cannot exceed 30 characters"],
        minLength:[4,"Name should have more than 4 characters"]
    },
    email:{
        type:String,
        required:[true,"Please enter your Email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a Valid Email"]
    },
    password:{
        type:String,
        required : [true,"Please Enter Your Password"],
        maxLength : [30, "Password Cannot exceed 30 characters"],
        minLength :[8,"Passowrd should have more than 8 characters"],
        select : false // IMP : passowrd will not be shown when we do find or any other query
    },
    avatar:{
        public_id: { 
            type: String, 
            required: true 
        },
        url: {
            type: String,
            required : true
        }
    },
    role:{
        type:String,
        default:"user",
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date
})

//hashing password here
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcryptjs.hash(this.password,10)
})

//JWT Token Creation
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRE
    })
}

// compare passowrd
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcryptjs.compare(enteredPassword,this.password)
}

// genrating password reset token 
userSchema.methods.getResetPasswordToken=async function(){ 
    //generating token
    const resetToken = crypto.randomBytes(20).toString("hex")

    //hashing and adding resetPasswordToken to schema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000
    return resetToken
}

module.exports = mongoose.model("User",userSchema)