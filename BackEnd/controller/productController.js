const Product=require("../models/productsModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors=require("../ middleware/catchAsyncErrors")
//create product --admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
})

//get all products 
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    const products = await Product.find()
    res.status(200).json({
        success:true,
        products
    })
})

//update products --admin
exports.updateProduct = catchAsyncErrors(async (req, res) => {
    let product = await Product.findById(req.params.id)
    console.log(req.body,"this is the body for edit product");
    if (!product) {
    //    return res.status(500).json({
    //         success: false,
    //         message:"product not found"
    //     })
    return next(new ErrorHandler("product not found",404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false })
    res.status(200).json({
        success: true,
        product
    })
})

//delete product --admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id
    const itemToBeDeleted = await Product.findById(id)
    if (!itemToBeDeleted) {
        // res.status(500).json({
        //     success: false,
        //     message:"Product not found" 
        // })
        return next(new ErrorHandler("product not found",404))
    }
    await Product.deleteOne({ _id: itemToBeDeleted?._id })
    res.status(200).json({
        success: true, 
        message:"Deleted Successfully"
    })
})

//get product details
exports.productDetails=catchAsyncErrors(async(req, res,next)=>{
    const id = req.params.id
    const item= await Product.findById(id)
    if(!item){
        // res.status(500).json({
        //     success:false,
        //     message:"product not found"
        // })
        return next(new ErrorHandler("product not foundA",404))
    }
    console.log("executing after IF")
    res.status(200).json({
        success:true,
        product:item
    })            
})



