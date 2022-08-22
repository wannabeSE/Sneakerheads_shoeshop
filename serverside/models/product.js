const mongoose= require('mongoose')

const product=mongoose.model(
    'Product',
    mongoose.Schema({
       name:{ 
        type:String,
        required:true
    },
        price:{
            type: Number,
            required:true
        },
        quantity:{
            type:Number,
            required:true
            },
        description:
            {
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

    },{
        toJSON:{
            transform:function(doc,ret){
                ret.productId=ret._id.toString();
                delete ret._id;
                delete ret.__v;
            }
        }
    }
    )
    )

module.exports={product}
// const productSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         require:true,
//         trim:true
//     },
//     slug:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     price:{
//         type:Number,
//         require:true
//     },
//     quantity:{
//         type:Number,
//         required:true
//     },
//     description:{
//         type:String,
//         required: true,
//         trim:true,

//     },
//     offer:{
//         type: Number,
//     },
//     pics:{
//         type:String,
//         required:true
//     },
//     category:{
//         type:mongoose.Schema.ObjectId, ref:'Category',
//         required:true
//     },
//     createdBy:{
//         type:mongoose.Schema.Types.ObjectId, ref:'User'
//     }

// },{timestamps:true})

// module.exports=mongoose.model('Product',productSchema)