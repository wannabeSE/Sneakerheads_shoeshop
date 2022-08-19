const express=require('express')
const { addtocart } = require('../controller/cartController')
const { requireSignin, userMiddleware }=require('../middleware/middleware')
const router=express.Router()

router.route('/user/cart/addtocart').post(requireSignin,addtocart)

module.exports=router