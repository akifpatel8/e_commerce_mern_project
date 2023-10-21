const app = require("./app")
const dotenv = require("dotenv")
const connectDB=require("./config/dataBase")
//uncaught Promise rejection
process.on("uncaughtException",(err)=>{
    console.log("Error",err.message);
    console.log("shutting down the server due to uncaughtException");
    process.exit(1)
})

//config
dotenv.config({path:__dirname+"/config/config.env"})
connectDB()

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on https:localhost:${process.env.PORT}`);
})


//unhandled Promise Rejection 
process.on("unhandledRejection",(err)=>{
  console.log("Error",err.message);
  console.log("shutting down the server due to unhandledRejection");
  server.close(()=>{
    process.exit(1)
  })  
})

// steps
// 1 make db connection
// 2 listen app on some port 
// 3 how to create app - 

// import express 
// app = express()
// app.use(express.json())
// app.use("/api/v1", product)
