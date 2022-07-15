const Category=require('../models/category')
const slugify= require('slugify')
const category = require('../models/category')
const { json } = require('body-parser')

function subCategoryCreate(categories, parentId=null){
    
    const categoryList=[]
    let subCategory
    if(parentId==null){
        subCategory=categories.filter(ct=>ct.parentId==undefined)
        
    }else{
        subCategory=categories.filter(ct=>ct.parentId==parentId)
        
    }
    
    for (let cat of subCategory){
        
        categoryList.push({
            _id:cat._id,
            name:cat.name,
            slug:cat.slug,
            children:subCategoryCreate(categories,cat._id)
        })
        
    }
    return categoryList
}


exports.createCategory=(req,res,next)=>{
    const categoryObj={
        name:req.body.name,
        slug:slugify(req.body.name)

    }
    if(req.body.parentId){
        categoryObj.parentId=req.body.parentId
    }
    const ctg= new Category(categoryObj)
    ctg.save((error,category)=>{
        if(error){
            return res.status(400).json({error})
        }
        if(category){
            return res.status(201).json({category})
        }
    })
}


exports.getCategory=(req, res ,next)=>{
    Category.find({}).
    exec((error, categories)=>{
        if(error){
            return res.status(400).json({error})
        }
        if(categories){
            const mainCatList= subCategoryCreate(categories)
            return res.status(201).json({mainCatList})
        }
    })
}

