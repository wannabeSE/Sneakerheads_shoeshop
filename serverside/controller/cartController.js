const Cart=require('../models/cart')
const cartService= require('../services/cartService')

exports.addtocart=(req, res, next)=>{
    var model ={
        userId:req.user.userId,
        products:req.body.products
    }
    cartService.addCart(model,(error, results)=>{
        if(error){
            return next(error)
        }
        return res.status(201).send({message:'success',data:results})
    })
}

exports.fetchCart=(req,res, next)=>{
    cartService.getCart({userId:req.user.userId}, (error, results)=>{
        if(error){
            return next(error)
        }
        return res.status(201).send({
            message:'success',
            data:results
        })
    })
}

exports.deleteItem=(req, res, next)=>{
    var model ={
        userId:req.user.userId,
        productId:req.body.productId,
        quantity:req.body.quantity
    }
    cartService.removeItem(model,(error, results)=>{
        if(error){
            return next(error)
        }
        return res.status(201).send({message:'success',data:results})
    })
}
