const app = require("./app")
const dotenv = require("dotenv")
const connectDB=require("./config/dataBase")
//config
dotenv.config({path:__dirname+"/config/config.env"})
connectDB()

app.listen(process.env.PORT, () => {
    console.log(`Server is working on https:localhost:${process.env.PORT}`);
})



// steps
// 1 make db connection
// 2 listen app on some port 
// 3 how to create app - 

// import express 
// app = express()
// app.use(express.json())
// app.use("/api/v1", product)
