const express = require("express")
const { getAllProducts, createProduct, updateProduct, deleteProduct } = require("../controller/productController")
// const app = require("../app")
const router = express.Router()


router.get("/products", getAllProducts)
router.post("/product/new", createProduct)
router.put("/product/update/:id", updateProduct)
router.delete("/product/delete/:id", deleteProduct)


module.exports = router 
