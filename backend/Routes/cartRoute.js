const express = require('express')
const auth = require('../middleware/auth')
const authCustomer = require('../middleware/authCustomer')
const authAdmin = require('../middleware/authAdmin')
const cartCtrl = require('../Controller/cartController')

const router = require('express').Router();
router.post('/addcart',cartCtrl.AddCart)
router.put('/updatecart/:id',cartCtrl.UpdateCart)
router.delete('/deletecart/:id',cartCtrl.DeleteCart)
router.get('/getallcart',cartCtrl.GetAllCart)
module.exports = router;