const express = require("express")
const { isAuthenticatedUser, authorizeRoles } = require("../ middleware/auth")
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controller/orderController")

const router = express.Router()

router.post("/order/new",isAuthenticatedUser,newOrder)
router.get("/order/:id",isAuthenticatedUser,getSingleOrder)
router.get("/myOrders",isAuthenticatedUser,myOrders)

router.get("/admin/allOrders",isAuthenticatedUser, authorizeRoles("admin"), getAllOrders)
router.put("/admin/updateOrder/:id",isAuthenticatedUser,authorizeRoles("admin"),updateOrder)
router.delete("/admin/removeOrder/:id",isAuthenticatedUser,authorizeRoles("admin"),deleteOrder)



module.exports = router 