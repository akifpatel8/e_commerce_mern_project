const express=require("express")
const { createUser, loginUser, logout, forgotPassword, resetPassowrd } = require("../controller/userController")
const router=express.Router()

router.post("/createUser",createUser)
router.post("/login",loginUser)
router.post("/password/forgot",forgotPassword)
router.put("/password/reset/:token",resetPassowrd)
router.get("/logout",logout)
module.exports = router