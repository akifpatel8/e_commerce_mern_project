const Product=require("../models/productsModel")

//create product --admin
exports.createProduct = async (req, res, next) => {
    const product = await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
}

//get all products 
exports.getAllProducts = async (req, res) => {
    const products = await Product.find()
    res.status(200).json({
        success:true,
        products
    })
}

//update products --admin
exports.updateProduct = async (req, res) => {
    let product = await Product.findById(req.params.id)
    console.log(req.body,"this is the body for edit product");
    if (!product) {
       return res.status(500).json({
            success: false,
            message:"product not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false })
    res.status(200).json({
        success: true,
        product
    })
}

//delete product --admin
exports.deleteProduct = async (req, res) => {
    const id = req.params.id
    const itemToBeDeleted = await Product.findById(id)
    if (!itemToBeDeleted) {
        res.status(500).json({
            success: false,
            message:"Product not found"
        })
    }
    await Product.deleteOne({ _id: itemToBeDeleted?._id })
    res.status(200).json({
        success: true,
        message:"Deleted Successfully"
    })
}