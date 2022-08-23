const {cart}=require("../models/cart")
const async=require("async")

async function addCart(params, callback){
    if(!params.userId){
        return callback({message: 'UserId needed'})
    }
    cart.findOne({userId:params.userId, },function(err, cartdb){
        if(err){
            return callback(err)
        }
        else{
            if(cartdb == null){
                const cartModel= new cart({
                    userId:params.userId,
                    products:params.products
                })
                cartModel.save()
                .then((response)=>{
                    return callback(null, response)
                })
                .catch((error)=>{
                    return callback(error)
                })
            }else if (cartdb.products.length == 0){
                cartdb.products==params.products
                cartdb.save()
                return callback(null,cartdb)
            }
            else{
                async.eachSeries(params.products, function(product,asyncDone){
                    let itemIndex= cartdb.products.findIndex(p=>p.product == product.product)

                    if(itemIndex===-1){
                        cartdb.products.push({
                            product:product.product,
                            quantity: product.quantity
                        })
                        cartdb.save(asyncDone)
                    }

                    else{
                        cartdb.products[itemIndex].quantity = cartdb.products[itemIndex].quantity + quantity
                        cartdb.save(asyncDone)
                    }
                })
                return callback(null, cartdb)
            }
        }
    })
}

async function getCart(params, callback){
    cart.findOne({userId:params.userId})
    .populate({
        path:'products',
        populate:{
            path:"product",
            model:'Product',
            select:'name price pics'
        }
    })
    .then((response)=>{
        return callback(null, response)
    })
    .catch((error)=>{
        return callback(error)
    })
}

async function removeItem(params,callback){
    cart.findOne({userId:params.userId}, function(err, cartdb){
        if(err){
            return callback(err)
        }
        else{
            if(params.productId && params.quantity){
                const productId=params.productId
                const quantity= params.quantity
                if(cartdb.products.length === 0){
                    return callback (null, 'Cart empty')
                }
                else{
                    let itemIndex= cartdb.products.findIndex(p=>p.product == productId)
                    
                    if(itemIndex === -1){
                        return callback(null, 'Invalid Product')
                    }
                    else{
                        if(cartdb.products[itemIndex].quantity === quantity){
                            cartdb.products.splice(itemIndex, 1)
                        }
                        else if(cartdb.products[itemIndex].quantity > quantity){
                            cartdb.products[itemIndex].quantity = cartdb.products[itemIndex].quantity - quantity
                        }
                        else
                        {return callback(null, 'enter lower quantity')}
                    }

                    cartdb.save((err, cartM)=>{
                        if(err) return callback(err)
                        return callback(err, 'Cart Updated ')
                    })
                }
            }
        }
    })
}

module.exports={addCart,getCart,removeItem}