const express=require('express')
const { addProd, getProduct } = require('../controller/prodController')
const router=express.Router()
const multer =require('multer')

const shortid= require('shortid')
const path = require('path')
const { generate } = require('shortid')
 
const storage=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,path.join(path.dirname(__dirname),'uploads'))
    },
    filename:function(req,file,cb){
        cb(null,shortid.generate()+ '-'+ file.originalname)
    }
})
const upload=multer({storage})




router.route('/product/create').post(upload.array('pics'),addProd)
router.route('/product/getproduct').get(getProduct)


module.exports=router