const mongoose= require('mongoose')

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        require:true
    },
    quantity:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required: true,
        trim:true,

    },
    offer:{
        type: Number,
    },
    pics:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.ObjectId, ref:'Category',
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId, ref:'User'
    }

},{timestamps:true})

module.exports=mongoose.model('Product',productSchema)