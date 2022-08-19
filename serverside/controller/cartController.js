const Cart=require('../models/cart')
const { insertMany } = require('../models/user')

exports.addtocart=(req,res,next)=>{
    Cart.findOne({user:req.user._id})
    .exec((error,cart)=>{
        if(error){
            return res.status(400).json({ error })
        } 
        if(cart){
            const prd=req.body.cartItems.product
            const item=cart.cartItems.find(crt => crt.product == prd)

            if(item){
                Cart.findOneAndUpdate({user:req.user._id, 'cartItems.product':prd},{
                    '$set':{
                        'cartItems.$':{
                            ...req.body.cartItems,
                            'quantity':item.quantity + parseInt(req.body.cartItems.quantity)
                        }
                    }
                }).exec((error,cart)=>{
                    if(error){
                        return res.status(400).json({error})
                    }
                    if(cart){
                        return res.status(200).json({cart:cart})
                    }
                })
            }else{
                Cart.findOneAndUpdate({user:req.user._id},{
                    '$push':{
                        'cartItems':req.body.cartItems
                    }
                }).exec((error,cart)=>{
                    if(error){
                        return res.status(400).json({error})
                    }
                    if(cart){
                        return res.status(200).json({cart:cart})
                    }
                })
            }
            
        }
        else{
            const cart= new Cart({
                user:req.user._id,
                cartItems:[req.body.cartItems],
        
            })
            cart.save((error,cart)=>{
                if(error){
                    return res.status(400).json({ error })
                } 
                if(cart){
                    return res.status(201).json({cart})
                }
               
            })
        }
    })
    
}