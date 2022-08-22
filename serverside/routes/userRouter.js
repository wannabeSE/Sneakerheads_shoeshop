const express=require('express');
const { adminSignup, adminLogin } = require('../controller/adminController');
const { createUser, login } = require('../controller/userController')
const {requireSignin,generateAccessToken}=require("../middleware/middleware")

const router= express.Router()
const User=require('../models/user')


router.route('/signup').post(createUser);
router.route('/signin').post(login)

//for admin 
router.route('/admin/signup').post(adminSignup)
router.route('/admin/signin').post(adminLogin)

module.exports=router