const Product=require('../models/product')
const slugify= require('slugify')

exports.addProd=(req,res, next)=>{
    const {name, price,quantity, description,category}=req.body

    let pics=[];
    if(req.files.length>0){
        pics=req.files.map(file=>{
            return {img:file.filename}
        })
    }

    const product=new Product({
        name:name,
        slug:slugify(name),
        price,
        quantity,
        description,
        pics,
        category
    })
    product.save(((error, product)=>{
        if(error){
            return res.status(400).json({error})
        }
        if(product){
            res.status(201).json({product})
        }
    }))
    
}

exports.getProduct=(req, res ,next)=>{
    Product.find({}).
    exec((error, product)=>{
        if(error){
            return res.status(400).json({error})
        }
        if(product){
            
            return res.status(201).json({product})
        }
    })
}