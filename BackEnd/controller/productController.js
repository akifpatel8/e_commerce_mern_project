const Product=require("../models/productsModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors=require("../ middleware/catchAsyncErrors")
const ApiFeatures = require("../utils/apiFeatures")
//create product --admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    req.body.user = req.user.id
    const product = await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
})

//get all products 
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    const resultPerPage=5
    const productCount=await Product.countDocuments()
    const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage)
    const products = await apiFeature.query
    res.status(200).json({
        success:true,
        products,
        productCount
    })
})

//update products --admin
exports.updateProduct = catchAsyncErrors(async (req, res,next) => {
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




// create new review or update the review

exports.createProductReview = catchAsyncErrors(async(req,res,next)=>{
    const {rating,comment,productId}=req.body
    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment
    }
    
    const product = await Product.findById(productId)
    const isReviewed = product.reviews.find((el)=>el.user.toString() === req.user._id.toString())

    if(isReviewed){
        product.reviews.forEach((el)=>{
            if(el.user.toString() === req.user._id.toString()){
                (el.rating = rating) ,
                (el.comment = comment)
            }
    })
    }else{
        product.reviews.push(review)
        product.numberOfReviews = product.reviews.length 
    }
    let avg = 0;
    product.reviews.forEach((el)=>
    avg+=el.rating ) 
    product.ratings= avg / product.reviews.length
    await product.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
    })
})

// view all reviews 
exports.getAllReviews = catchAsyncErrors(async(req,res,next)=>{
    const product =  await Product.findById(req.query.id)
    if (!product) {
        return next(new ErrorHandler("product not found",404))
    }
    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
})

// delete review
exports.deleteReview = catchAsyncErrors(async(req,res,next)=>{
    const product =  await Product.findById(req.query.productId)
    if (!product) {
        return next(new ErrorHandler("product not found",404))
    }
    
    const reviews = product.reviews.filter((el)=>el?._id.toString() !== req.query.id.toString())
    console.log(reviews,"these are reviews");
    let avg = 0;
    reviews.forEach((el)=>
    avg+=el.rating ) 
    const ratings = avg / reviews.length
    const numberOfReviews =  reviews.length
    product.reviews=reviews
    product.ratings=ratings
    product.numberOfReviews=numberOfReviews
    console.log(product,"this is the product");
    await product.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
})