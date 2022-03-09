const express = require('express');
const auth = require('../middleware/auth');
const authCustomer = require('../middleware/authCustomer')
const userCtrl = require('../Controller/userController');
const router = require('express').Router();

//đăng nhập tài khoản admin
router.post('/login', userCtrl.loginAdmin);
//refresh token
router.get('/refresh_token', userCtrl.refreshToken);
module.exports=router;