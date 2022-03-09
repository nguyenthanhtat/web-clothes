const Users = require('../Model/userModel.js')
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const sendEmail = require('./SendEmail');
const path = require('path');
const { chownSync } = require('fs');
const userCtrl ={
    //create new account
    Register: async (req,res)=>{
        try {
            const {fullname,email,password,sex,date_of_birth,phone_number} = req.body;
            const user = await Users.findOne({email});
            if (user)
            return res.json({
              status: 400,
              success: false,
              msg: 'The email already exists.',
            });
            if (password.length < 6)
            return res.json({
              status: 400,
              success: false,
              msg: 'Password is at least 6 characters long.',
            });
            //kiểm tra format password
            let reg = new RegExp(
                '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$'
            ).test(password);
            if (!reg) {
                return res.json({
                status: 400,
                success: false,
                message:
                    'Password must contain at least one number and one uppercase and lowercase and special letter, and at least 6 or more characters ',
                });
            }
            // Password Encryption
            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = new Users({
                fullname,
                email,
                password: passwordHash,
                sex,
                date_of_birth,
                phone_number,

            });
               // Save mongodb
            await newUser.save();
            
            // Then create jsonwebtoken to authentication
            const accesstoken = createAccessToken({ id: newUser._id,role:0 });
            const refreshtoken = createRefreshToken({ id: newUser._id,role:0 });
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/api/auth/customer/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
            });
            res.json({
                status: 200,
                success: true,
                accesstoken,
                msg: 'Register Successfully 😍!!',
            });
        }catch(error){
            return res.json({
                status: 400,
                success: false,
                msg: error.message,
              });
        }
    },
    async refreshToken (req, res) {
        try{    
            const rf_token = req.cookies.refreshtoken;
            console.log(rf_token,'rftoken')
            if(!rf_token) return res.json({msg:'Please Login or Register'});
            jwt.verify(rf_token,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
                if(err) return res.json({msg:'Please Login or Register'});
                const accessToken = createAccessToken({id:user.id,role:user.role});

                res.json({
                    status:200,
                    success:true,
                    msg:'Login Sucessfully',
                    accessToken:accessToken,
                });
            });
            
        }catch(err){
            res.json({
                status:400,
                success:false,
                msg:err.message,
            });

        }
    },
    async loginCustomer(req,res){
        try {
            const {email,password} = req.body;
            const user = await Users.findOne({email: email,role:0});
            if(!user)
            return res.json({
                status:400,
                success:false,
                msg:'User does not exist',
            }); 
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch)
            return res.json({
                status:400,
                success:false,
                msg:'Incorrect password.',
            });
            //if login success, crate access token and refresh token
            const accessToken = createAccessToken({id:user._id,role:0});
            const refreshtoken = createRefreshToken({id:user._id,role:0});
            
            res.cookie('refreshtoken',refreshtoken,{
                httpOnly:true,
                path:'/api/auth/customer/refresh_token',
                maxAge:7 * 24 * 60 * 60 * 1000, // 7d
            
            });
            res.json({
                status:200,
                success:true,
                accessToken,
                msg:'Login Sucessfully!',
            })
        }catch(err){
            return res.json({
                status:400,
                success:false,
                msg:err.message,
            })
        }
    },
    async loginAdmin  (req,res) {
        try {
            const {email,password} =req.body;
            //kt admin
            const user = await Users.findOne({email,role:1});
            if(!user){
                return res.json({
                    status:400,
                    success:false,
                    msg:"User khong ton tai"
                })
            }
            //dung email thi kt password
            const match = await bcrypt.compare(password,user.password);
            if(!match){
                return res.json({
                    status:400,
                    success:false,
                    msg:"incorrect password"
                });
            }
            //dang nhap thanh cong tao token
            const accesstoken = createAccessToken({id:user.id,role:user.role});
            const refreshtoken = createAccessToken({id:user.id,role:user.role});
            // luu vao cookie
            res.cookie('refreshtoken',refreshtoken,{
                httpOnly:true,
                path:'/api/auth/admin/refresh_token',
                maxAge:7*24*60*60*1000,//7d
            });
            return res.json({
                status:200,
                success:true,
                accesstoken,
                msg:'Login sucessfully'
            })
        } catch (err) {
            return res.json({
                status:400,
                success:false,
                msg:err.message,
            })
        }
    },
    async logoutCustomer (req, res) {
        try{
            res.clearCookie('refreshtoken',{
                path:'/api/auth/customer/refresh_token',
            });
            return res.json({
                status:200,
                success:true,
                msg:'logged out success'
            });

            
        }catch(err){
            return res.json({
                status:400,
                msg:err.message,
            });
        }

    },
    //xem profile
    async profile(req, res){
        try{
            const user = await Users.findById(req.user.id).select('-password');
            if(!user) 
            return res.json({
                status:400,
                success: false,
                msg:'User does not exist',
            });
            res.json({
                status:200,
                success: true,
                user,
            });

        }catch(err){
            return res.json({
                status:400,
                msg:err.message,
            })
        }
    },
    //update profile
    async updateProfile (req, res) {
        try{
            const {fullname,image,phone_number,sex,date_of_birth} = req.body;
            if (!image)
            return res.json({
              status: 400,
              success: false,
              msg: 'No image upload',
            });
            await Users.findOneAndUpdate(
                {_id:req.user.id},
                {fullname,image,phone_number,sex,date_of_birth,updatedAt:Date.now}
                
                );
            res.json({
                status:200,
                success:true,
                msg:'Updated Profile Successfully !',
            });

        }catch(err){
            return res.json({
                status:400,
                msg:err.message,
            })
        }
    },
    async ChangePassword (req, res) {
        try{
            const user = await Users.findById(req.user.id).select('+password');
            console.log(user)
            const {password,oldPassword,confirmPassword} = req.body;
            if(!password)
            return res.json({
                status:400,
                succes:false,
                msg:'Password are not empty.',
            });
            if (!confirmPassword)
                return res.json({
                    status:400,
                    success:false,
                    msg:'Confirm password are not empty.',
                });
            if (!oldPassword)
            return res.json({
                status:400,
                success:false,
                msg:'Old password are not empty.',
            });
            if(password.length <6)
            return res.json({
                status:400,
                success:false,
                msg:'Password must be at least 6 characters',
            });
            let reg = new RegExp(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$'
            ).test(password);
            if(!reg){
                return res.json({
                    status:400,
                    success:false,
                    msg:'Includes 6 characters,uppercase,lowercase and some and special character.',

                });
            }
            if(confirmPassword !== password){
                return res.json({
                    status:400,
                    success:false,
                    msg:'Old Password Incorrect',
                });

            }
            const isMatch = await bcrypt.compare(oldPassword,user.password);
            if(!isMatch)
                return res.json({
                    status:400,
                    success:false,
                    msg:'Old Password Incorrect',

                });
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password,salt);
            const userPassword = await Users.findByIdAndUpdate(
                {_id:user.id},
                {password:passwordHash,},
                {new:true}
            );
            return res.json({
                status:200,
                success:true,
                msg:'Change Password Successfully!',
            });

        }catch(err){
            return res.json({
                status:400,
                msg:err.message,
            })
        }
    },

    // async forgetPasswordCustomer (req, res){
    //     const user = await Users.findOne({email:req.body.email , role :0});
    //     const {email} = req.body;
    //     if(!email){
    //         res.json({
    //             status:400,
    //             success:false,
    //             msg:'Email are not empty',
    //         });
    //     }
    //     if(!user){
    //         res.json({
    //             status:400,
    //             success:false,
    //             msg:'Account Not exit',
    //         });
    //     }
    //     const resetToken = user.getResetPasswordToken();
    //     //??
    //     await user.save({validateBeforeSave:false});

    //     const resetPasswordUrl = `${req.protocol}://${req.get(
    //         'host'
    //     )}/customer/passwword/reset/${resetToken}`;
    //     try{
    //         await sendEmail({
    //             emailFrom:process.env.SMPT_MAIL,
    //             emailTo:user.email,
    //             subject:`Forgot Password`,
    //             template:'forgot-password',
    //             attachments:[
    //                 {
    //                     filename:'mobiphone.jpg',
    //                     path:path.resolve('./views','image','mobiphone.jpg'),
    //                     cid:'mobiphone_logo',
    //                 },
    //                 {
    //                     filename:'question.png',
    //                     path:path.resolve('./views','image','question.png'),
    //                     cid:'question_img'
    //                 },
    //             ],
    //             context:{
    //                 resetPasswordUrl,
    //             },
    //         });
    //         return res.json({
    //             status:200,
    //             success:true,
    //             msg:`Email sent to ${user.email} successfully`,
    //         });
    //     }catch(error){
    //         user.resetPasswordToken = undefined;
    //         user.resetPasswordExprire=undefined;
    //         await user.save({validateBeforeSave:true});
    //         console.log(error);

    //     }
    // },
    // async resetPassword (req, res) {
    //     const {password,confirmPassword}=req.body;

    //     const resetPasswordToken = crypto
    //         .createHash('sha256')
    //         .update(req.params.token)
    //         .digest('hex');
    //     const user = await Users.findOne({
    //         resetPasswordToken,
    //         resetPasswordExprire:{$gt: Date.now()},
    //     });

    //     if(!user){
    //         return res.json({
    //             status: 400,
    //             success:false,
    //             msg:'Reset Password Token is invalid or has been expired',
    //         });
    //     }
    //     if(!password)
    //         return res.json({
    //             status: 400,
    //             success:false,
    //             msg: 'Password are not empty.',

    //         })
    //     if (!confirmPassword)
    //         return res.json({
    //             status: 400,
    //             success: false,
    //             msg: ' Confirm are not empty.',
    //         });

    //     if (password.length < 6)
    //     return res.json({
    //         status: 400,
    //         success: false,
    //         msg: 'Password is at least 6 characters long.',
    //     });
    //     let reg = new RegExp(
    //         '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$'
    //       ).test(password);
    //       if (!reg) {
    //         return res.json({
    //           status: 400,
    //           success: false,
    //           msg: 'Includes 6 characters, uppercase, lowercase and some and special characters.',
    //         });
    //       }
    //       if (confirmPassword !== password) {
    //         return res.json({
    //           status: 400,
    //           success: false,
    //           msg: 'Password and confirm password does not match!',
    //         });
    //       }
    //     user.password=password;
    //     user.resetPasswordToken = undefined;
    //     user.resetPasswordExprire=undefined;
    //     const salt = await bcrypt.genSalt(10);
    //     const passwordHash = await bcrypt.hash(user.password,salt);
    //     const userPassword = await Users.findByIdAndUpdate(
    //         {_id:user.id},
    //         {password:passwordHash},
    //         {new:true}
    //     );
    //     res.json({
    //         status:200,
    //         success:true,
    //         msg:'Reset successfully',
    //     });

        
    // },
    async GetAllCutomer (req, res) {
        try{
            const allAcount = await Users.find({})
            return res.status(200).json({
                status:200,
                msg:' Get all Cutomer successfully',
                data:allAcount
            })

        }catch(err){

            return res.status(400).json({
                status:400,
                msg:' Get all Cutomer Fail'
            })
        }
    },
    async RemoveCutomer (req, res) {
        try{
            const id = req.params.id
            await Users.findByIdAndRemove({_id:id});
            return res.status(200).json({
                status:200,
                msg:'Remove Cutomer successfully',
            })

        }catch(err){

            return res.status(400).json({
                status:400,
                msg:'Remove CutomerFail'
            })
        }
    },
    async UpdateCutomer (req, res) {
        try{
            const id = req.params.id
            const {email, password} = req.body
            if(email === "" && password === ""){
                return res.status(400).json({
                    status:400,
                    msg:'empty email or password'
                })
            }
            await Users.findByIdAndUpdate({_id:id},{email:email, password:password});
            return res.status(200).json({
                status:200,
                msg:'Update Cutomer successfully',
            })

        }catch(err){

            return res.status(400).json({
                status:400,
                msg:'Update Cutome Fail'
            })
        }
    },

}
const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
  };
  const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  };
module.exports = userCtrl;