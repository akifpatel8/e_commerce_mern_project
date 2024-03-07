const Order=require("../models/orderModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors=require("../ middleware/catchAsyncErrors")
const Product=require("../models/productsModel")

//create new order 
exports.newOrder=catchAsyncErrors(async(req,res,next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    }=req.body

    const order=await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id,
    })
    res.status(200).json({
        success:true,
        order
    })
})

//get single order
exports.getSingleOrder = catchAsyncErrors(async(req,res,next) => {
    const order = await Order.findById(req.params.id).populate("user","name email")
    if (!order) {
        return next(new ErrorHandler("Order not found with this Id",404))
    }
    res.status(200).json({
        success:true,
        order
    })

})

//get logged in orders
exports.myOrders = catchAsyncErrors(async(req,res,next) => {
    const orders = await Order.find({user:req.user._id})
    res.status(200).json({
        success:true,
        orders
    })

})

//get all orders --admin
exports.getAllOrders = catchAsyncErrors(async(req,res,next) => {
    const orders = await Order.find()
    let totalAmount=0
    orders.forEach((el)=>
    totalAmount += el.totalPrice)
    res.status(200).json({
        success:true,
        orders,
        totalAmount
    })
})

//update order status --admin
exports.updateOrder = catchAsyncErrors(async(req,res,next) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        return next(new ErrorHandler("Order not found with this Id",404))
    }
    if (order.orderStatus==="Delivered") {
        return next(new ErrorHandler("You have already delivered this order",404))
    }

    order.orderItems.forEach(async(el)=>{
        await updateStock(el.product,el.quantity)
    })
   
    order.orderStatus=req.body.status

   if(req.body.status==="Delivered"){
    order.deliveredAt=Date.now()
   }
   await order.save({validateBeforeSave:false})

    res.status(200).json({
        success:true,
        order,
    })
})

async function updateStock(id,quantity){
    const product = await Product.findById(id)
    product.stock-=quantity
    await product.save({validateBeforeSave:false})
}

//delete order --admin
exports.deleteOrder = catchAsyncErrors(async(req,res,next) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        return next(new ErrorHandler("Order not found with this Id",404))
    }
    await order.deleteOne()
    res.status(200).json({
        success:true,
        message:"order deleted successfully"
    })
})