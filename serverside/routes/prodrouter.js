const express=require('express')
const { addProd, getProducts } = require('../controller/prodController')
const router=express.Router()
const multer =require('multer')

const shortid= require('shortid')
const path = require('path')
 
const storage=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,path.join(path.dirname(__dirname),'uploads'))
    },
    filename:function(req,file,cb){
        cb(null,shortid.generate()+ '-'+ file.originalname)
    }
})
const upload=multer({storage})




router.route('/product/create').post(addProd)
router.route('/product/getproduct').get(getProducts)


module.exports=router