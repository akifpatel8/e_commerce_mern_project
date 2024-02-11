const express=require("express")
const { createUser, loginUser, logout, forgotPassword, resetPassowrd, getUserDetails, changePassword, updateProfile, getAllUsers, getSingleUser, deleteUser, updateUserRole } = require("../controller/userController")
const { isAuthenticatedUser, authorizeRoles } = require("../ middleware/auth")
const router=express.Router()

router.post("/createUser",createUser)
router.post("/login",loginUser)
router.post("/password/forgot",forgotPassword)
router.put("/password/reset/:token",resetPassowrd)
router.get("/logout",logout)

router.get("/getUserDetails",isAuthenticatedUser, getUserDetails)
router.put("/changePassword",isAuthenticatedUser,changePassword)
router.put("/updateProfile",isAuthenticatedUser,updateProfile)
router.get("/admin/getUsers",isAuthenticatedUser,authorizeRoles("admin"), getAllUsers)
router.get("/admin/getSingle/:id",isAuthenticatedUser,authorizeRoles("admin"), getSingleUser)
router.put("/admin/updateRole/:id",isAuthenticatedUser,authorizeRoles("admin"), updateUserRole)
router.delete("/admin/deleteUser/:id",isAuthenticatedUser,authorizeRoles("admin"), deleteUser)

module.exports = router