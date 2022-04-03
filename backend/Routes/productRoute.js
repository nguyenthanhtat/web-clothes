const express = require('express')
const productCtrl = require('../Controller/productController.js');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin')
const router = require('express').Router();
//createProduct
router.post('/newproduct',auth,authAdmin,productCtrl.NewProduct);
//updateProduct
router.put('/updateproduct/:id',auth,authAdmin,productCtrl.UpdateProduct);
//delete product
router.delete('/deleteproduct/:id',auth,authAdmin,productCtrl.DeleteProduct);
//getall product
router.get('/getallproduct',productCtrl.GetallProduct);
//getall product
router.get('/find/:id',productCtrl.GetProduct);

module.exports=router;