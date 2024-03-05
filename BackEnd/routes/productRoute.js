const express = require("express")
const { getAllProducts, createProduct, updateProduct, deleteProduct,productDetails, createProductReview, getAllReviews, deleteReview } = require("../controller/productController")
const { isAuthenticatedUser, authorizeRoles } = require("../ middleware/auth")
// const app = require("../app")
const router = express.Router()


router.get("/products", getAllProducts)
router.post("/admin/product/new", isAuthenticatedUser,authorizeRoles("admin"), createProduct)
router.put("/admin/product/update/:id", isAuthenticatedUser,authorizeRoles("admin"), updateProduct)
router.delete("/admin/product/delete/:id", isAuthenticatedUser,authorizeRoles("admin"), deleteProduct)
router.get("/product/:id",productDetails)
router.put("/review",isAuthenticatedUser,createProductReview)
router.get("/getProductReviews",getAllReviews)
router.delete("/deleteReview",isAuthenticatedUser,deleteReview)

module.exports = router 
