const express=require('express')
const { addtocart,deleteItem,fetchCart } = require('../controller/cartController')
const { requireSignin, userMiddleware }=require('../middleware/middleware')
const router=express.Router()

router.route('/user/cart/addtocart').post([requireSignin],addtocart)
router.route('/user/cart/getcart').get([requireSignin],fetchCart)
router.route('/user/cart/removeitem').delete([requireSignin],deleteItem)


module.exports=router