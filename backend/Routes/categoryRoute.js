const express = require('express')
const categoryCtrl = require('../Controller/categoryController');
const auth =require('../middleware/auth')
const authCustomer = require('../middleware/authCustomer')
const authAdmin = require('../middleware/authAdmin')
const router =require('express').Router()

//create categories
router.post('/createcategory',auth,authAdmin,categoryCtrl.NewCategory);

module.exports=router;