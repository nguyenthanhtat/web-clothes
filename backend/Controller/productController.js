const Product = require('../Model/productModel.js')
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const sendEmail = require('./SendEmail');
const path = require('path');
const { chownSync } = require('fs');
const productCtrl={
    NewProduct:async (req, res)=>{
        const newProduct = new Product(req.body);
        try {
            const savedProduct = await newProduct.save();
            res.status(200).json(savedProduct);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },
    UpdateProduct:async (req, res)=>{
     
        try {
            const updateProduct = await Product.findByIdAndUpdate(
                req.params.id,
                {
                    $set:req.body
                },
                {new:true}
                );

            
            res.status(200).json(updateProduct);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },
    DeleteProduct: async(req, res)=>{
        try {
            await Product.findByIdAndDelete(req.params.id)
            res.status(200).json("Product has been deleted....")
            
        } catch (err) {
            res.status(500).json(err)
        }
    },
    GetallProduct : async (req, res)=>{
        const qNew = req.query.new;//truy van theo danh muc
        const qCategory = req.query.category;
        try {
            let products;
            // thuchientruy van
            if(qNew){
                products = await Product.find().sort({createdAt:-1}).limit(1)
            } else if(qCategory){
                products = await Product.find({categories:{
                    $in:[qCategory],
                },});
            }else{
                products = await Product.find();
            }
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json(err); 
            
        }
    }
}
module.exports = productCtrl;