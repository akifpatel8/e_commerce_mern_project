const express = require("express")
const app = express()
const errorMiddleware=require("./ middleware/error")
const test=require("./ middleware/test")
const cookieParser=require("cookie-parser")

app.use(express.json())  // to parse the incoming JSON data
app.use(cookieParser())
//Route imports

const productRoute =require("./routes/productRoute")
const user  = require("./routes/userRoute") 
const order  = require("./routes/orderRoute") 
app.use("/api/v1", productRoute)
app.use("/api/v1",user)
app.use("/api/v1",order)
//middleware for error
app.use(errorMiddleware)
// app.use(test)



module.exports = app