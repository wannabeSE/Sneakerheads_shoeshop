const Product=require('../models/product')
const slugify= require('slugify')

exports.addProd=(req,res, next)=>{
    const {name, price,quantity, description,pics,category}=req.body

    // let pics=[];
    // if(req.files.length>0){
    //     pics=req.files.map(file=>{
    //         return {img:'http://localhost:8080'+'/images/'+file.filename}
    //     })
    // }

    const product=new Product({
        name:name,
        slug:slugify(name),
        price,
        quantity,
        description,
        pics,
        category
    });
    product.save(((error, product)=>{
        if(error){
            return res.status(400).json({error})
        }
        if(product){
            res.status(201).json({product})
        }
    }))
    
}


exports.getProducts = async (req, res) => {
    const products = await Product.find({})
      .select("_id name price quantity slug description pics category")
      .populate({ path: "category", select: "_id name" })
      .exec();
  
    res.status(200).json({ products });
  };