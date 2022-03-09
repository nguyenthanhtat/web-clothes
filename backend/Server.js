const express =require('express')
const dotenv =require('dotenv');
const app =require("./app");
const cloudinary = require("cloudinary");
dotenv.config({path:".env"});
const fs = require("fs");
const connectDB=require('./Config/connectDb.js')
connectDB();
//?
if(process.env.NODE_ENV !== 'PRODUCTION'){
    require("dotenv").config({path:".env"});
}
app.get('/',(req,res)=>{
    res.json({message:"Welcome to thanhtat 11"})
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`server is listening on port:http://localhost:${PORT}`)
);
