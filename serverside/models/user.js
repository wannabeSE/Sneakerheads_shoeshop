const mongoose=require('mongoose')

const user= mongoose.model(
    'User',
    mongoose.Schema({
        firstName:{
            type:String,
            required:true,
            trim:true,
            min:3,
            max:20
        },
        lastName:{
            type:String,
            required:true,
            trim:true,
            min:3,
            max:20
        },
        email:{
            type:String,
            required:true,
            trim:true,
            unique:true,
            lowercase:true,
        },
        password:{
            type:String,
            required:true,
        },
        role:{
            type: String,
            enum:['user','admin'],
            default:'user',
        },
    },{
        toJSON:{
            transform:function(doc, ret){
                ret.userId=ret._id.toString();
                delete ret._id;
                delete ret.__v;
                delete ret.password;
            }
        }
    },{timestamps:true})
)
module.exports={user}
