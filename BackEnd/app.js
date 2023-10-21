const express = require("express")
const app = express()
const errorMiddleware=require("./ middleware/error")
const test=require("./ middleware/test")

app.use(express.json())  // to parse the incoming JSON data
//Route imports

const productRoute =require("./routes/productRoute")
app.use("/api/v1", productRoute)

//middleware for error
app.use(errorMiddleware)
// app.use(test)



module.exports = app