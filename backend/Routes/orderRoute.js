const express = require('express')
const auth = require('../middleware/auth')
const authCustomer = require('../middleware/authCustomer')
const authAdmin = require('../middleware/authAdmin')
const router = require('express').Router();
const orderCtrl = require('../Controller/orderController')

router.post ('/addorder',auth,orderCtrl.AddOrder)
router.put ('/updateorder/:id',auth,authAdmin,orderCtrl.UpdateOrder)
router.post ('/deleteorder/:id',auth,authAdmin,orderCtrl.DeleteOrder)
router.post ('/getallorder',auth,authAdmin,orderCtrl.GetAllOrder)
module.exports = router 