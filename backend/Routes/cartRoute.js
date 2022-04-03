const express = require('express')
const auth = require('../middleware/auth')
const authCustomer = require('../middleware/authCustomer')
const authAdmin = require('../middleware/authAdmin')
const cartCtrl = require('../Controller/cartController')

const router = require('express').Router();
router.post('/addcart',auth,cartCtrl.AddCart)
router.put('/updatecart/:id',authCustomer,cartCtrl.UpdateCart)
router.delete('/deletecart/:id',authCustomer ,cartCtrl.DeleteCart)
router.get('/getallcart',authAdmin,cartCtrl.GetAllCart)
module.exports = router;