const {product}=require('../models/product')
const prodService= require("../services/prodService")

exports.addProd=(req,res,next)=>{
    var model={
        name:req.body.name,
        price:req.body.price,
        quantity:req.body.quantity,
        description:req.body.description,
        pics:req.body.pics, 
        category:req.body.category,
    }   
    console.log(req.body.category)
    console.log(model)
    prodService.createProduct(model,(error,results)=>{
        if(error){
            console.log(error)
            return next(error)
        }else{
            return res.status(200).send({message:'success',data:results})
        }
    })
}

exports.findAll=(req,res,next)=>{
    var model={
        name:req.query.name,
        sort:req.query.sort
    }
    prodService.search(model,(error,results)=>{
        if(error){
            return next(error)
        }
        else{
            return res.status(200).send({
                message:'success',
                data:results
            })
        }
    })
}
exports.updatePd=(req,res,next)=>{
    var model={
        productId:req.params.id,
        name:req.body.name,
        price:req.body.price,
        quantity:req.body.quantity,
        description:req.body.description,
        pics:req.body.pics,
        category:req.body.category,
    }   
    prodService.updateProd(model,(error,results)=>{
        if(error){
            return next(error)
        }else{
            return res.status(200).send({message:'success',data:results})
        }
    })
} 

exports.deletePd=(req,res,next)=>{
    var model={
        productId:req.params.id
    }
    prodService.deleteProd(model,(error,results)=>{
        if(error){
            return next(error)
        }
        else{
            return res.status(200).send({
                message:'success',
                data:results
            })
        }
    })
}



exports.getProducts = async (req, res) => {
    const products = await product.find({})
      .select("_id name price quantity slug description pics category")
      .populate({ path: "category", select: "_id name" })
      .exec();
  
    res.status(200).json({ products });
  };