const express = require('express');
const auth = require('../middleware/auth');
const authCustomer = require('../middleware/authCustomer')
const userCtrl = require('../Controller/userController.js');
const router = require('express').Router();
// register user
router.post('/register',userCtrl.Register);
//login customer
router.post('/login',userCtrl.loginCustomer);
//login customer
router.post('/login-google',userCtrl.loginGoogle);
//refresh token
router.get('/refresh_token', userCtrl.refreshToken);
// verify account
router.get('/verifyAccount', userCtrl.verifyAccount);
//đăng xuất
router.get('/logout', userCtrl.logoutCustomer);
// xem profile 
router.get('/profile', auth, authCustomer, userCtrl.profile);
//cập nhập profile
router.patch('/profile/update', auth, authCustomer, userCtrl.updateProfile);
//thay đổi mật khẩu
router.patch('/changePassword', auth, authCustomer, userCtrl.ChangePassword);

//quên mật khẩu tài khoản khách hàng
// router.post('/forget', userCtrl.forgetPasswordCustomer);

//link reset mật khẩu khi quên mật khẩu
// router.put('/password/reset/:token', userCtrl.resetPassword);

// router.get('/getall',userCtrl.GetAllCutomer);
// router.delete('/remove/:id',userCtrl.RemoveCutomer);
// router.patch('/update/:id',userCtrl.UpdateCutomer);
module.exports=router;