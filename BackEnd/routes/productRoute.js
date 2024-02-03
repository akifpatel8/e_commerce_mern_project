const express = require("express")
const { getAllProducts, createProduct, updateProduct, deleteProduct,productDetails } = require("../controller/productController")
const { isAuthenticatedUser, authorizeRoles } = require("../ middleware/auth")
// const app = require("../app")
const router = express.Router()


router.get("/products", getAllProducts)
router.post("/product/new", isAuthenticatedUser,authorizeRoles("admin"), createProduct)
router.put("/product/update/:id", isAuthenticatedUser,authorizeRoles("admin"), updateProduct)
router.delete("/product/delete/:id", isAuthenticatedUser,authorizeRoles("admin"), deleteProduct)
router.get("/product/:id",productDetails)

module.exports = router 
