const express=require('express')
const { createUser, login } = require('../controller/userController')
const router= express.Router()
const User=require('../models/user')


router.route('/signup').post(createUser);
router.route('/signin').post(login)

module.exports=router