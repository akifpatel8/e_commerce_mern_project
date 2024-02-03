const express=require("express")
const { createUser, loginUser, logout } = require("../controller/userController")
const router=express.Router()

router.post("/createUser",createUser)
router.post("/login",loginUser)
router.get("/logout",logout)
module.exports = router