const express=require('express')
const router=express.Router()
const {createCategory, getCategory} =require('../controller/categoryController')

router.route('/category/create').post(createCategory)
router.route('/category/getcategory').get(getCategory)


module.exports=router