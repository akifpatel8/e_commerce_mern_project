const mongoose = require("mongoose")

const connectDB = () => { 
    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("DataBase connected");
    })
    .catch((err) => {
        console.log("Error in DataBase Connection ",err);
    })
}
module.exports=connectDB