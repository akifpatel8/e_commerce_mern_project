const express = require("express")
const { getAllProducts, createProduct, updateProduct, deleteProduct,productDetails } = require("../controller/productController")
// const app = require("../app")
const router = express.Router()


router.get("/products", getAllProducts)
router.post("/product/new", createProduct)
router.put("/product/update/:id", updateProduct)
router.delete("/product/delete/:id", deleteProduct)
router.get("/product/:id",productDetails)

module.exports = router 
