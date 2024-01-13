const app = require("./app")
const dotenv = require("dotenv")
const connectDB=require("./config/dataBase")
//uncaught Promise rejection
//unexpected errors
process.on("uncaughtException",(err)=>{
    console.log("Error",err.message);
    console.log("shutting down the server due to uncaughtException");
    process.exit(1) //here 1 indicates an error 
})

//config
//__dirname is a special variable in node js
// which gives the absolute path of the file 
// like this - /Users/test/Desktop/MERN_Project/BackEnd
//special varibles
// 1 __dirname
// 2 __filename
// 3 process
// 4 exports
// 5 module
// 6 require
// 7 global
// 8 __proto__

dotenv.config({path:__dirname+"/config/config.env"})//configuring .env file
connectDB()

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on https:localhost:${process.env.PORT}`);
})


//unhandled Promise Rejection 
//rejection not handled with .catch or .then
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
