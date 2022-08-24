const {product}=require("../models/product")

async function createProduct(params,callback){
    if(!params.name){
        return callback({message:'enter product name'})
    }

    const productModel= new product(params)
    productModel.save()
    .then((response)=>{
        return callback(null, response)
    })
    .catch((error)=>{
        return callback(error)
    })
}

async function search(params, callback){
    const pName=params.name
    const pPrice= params.pPrice
    var condition={}
    if(pName){
        condition['name']={
            $regex:new RegExp['name'], $options: 'i'
        }
    }
    if(pPrice){
        condition['price']={
            $regex:new RegExp['price'], $options: 'i'
        }
    }
    product.find(condition,'name price').sort(params.sort)
    .then((response)=>{
        return callback(null, response)
    })
}

async function updateProd(params, callback){
    const productId=params.productId
    product.findByIdAndUpdate(productId,params,{useFindAndModify:false})
    .then((response)=>{
        if(!response){
            callback('cannot update product with this id')
        }
        else{return callback(null,response)}
    })
    .catch((error)=>{
        return callback(error)
    })
}

async function deleteProd(params, callback){
    const productId=params.productId
    product.findByIdAndRemove(productId)
    .then((response)=>{
        if(!response){
            callback('cannot delete product with this id')
        }
        else{return callback(null,response)}
    })
    .catch((error)=>{
        return callback(error)
    })
}

module.exports={createProduct,search,updateProd,deleteProd}