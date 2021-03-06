const express=require('express');
const { adminSignup, adminLogin } = require('../controller/adminController');
const { createUser, login, requireSignin } = require('../controller/userController')
const router= express.Router()
const User=require('../models/user')


router.route('/signup').post(createUser);
router.route('/signin').post(login)
router.route('/profile').post(requireSignin,(req,res)=>{
    res.status(200).json({user:'profile'})
})
//for admin 
router.route('/admin/signup').post(adminSignup)
router.route('/admin/signin').post(adminLogin)

module.exports=router