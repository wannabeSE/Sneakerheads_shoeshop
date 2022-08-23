const express=require('express');
const { createAdmin,adminLogin } = require('../controller/adminController');
const { createUser, login } = require('../controller/userController')
const {requireSignin,generateAccessToken}=require("../middleware/middleware")

const router= express.Router()


router.route('/signup').post(createUser);
router.route('/signin').post(login)

//for admin 


router.route('/admin/signup').post(createAdmin)
router.route('/admin/signin').post(adminLogin)

module.exports=router