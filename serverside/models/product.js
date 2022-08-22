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
