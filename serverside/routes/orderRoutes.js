const express=require('express');
const { create,findAll, update, orderByCustomers } = require('../controller/orderController');
const {requireSignin,generateAccessToken}=require("../middleware/middleware")
const router= express.Router()

router.route('/order/getorders').get([requireSignin],findAll)
router.route('/order/update').put([requireSignin],update)
router.route('/order/create').post([requireSignin],create)
router.route('/order/allorders').get([requireSignin],orderByCustomers)

module.exports=router