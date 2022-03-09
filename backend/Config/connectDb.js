require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = async ()=>{
    try{
        await mongoose.connect(
            process.env.MONGODB_URL
        ,{
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        console.log("MonggoDB connection SUCCESS");

    }catch(error) {
        console.log(error);
        console.log("MonggoDB connection FAIL");
        process.exit(1);
    }
};   
   module.exports = connectDB;