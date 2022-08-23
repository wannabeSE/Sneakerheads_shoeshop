const {user}=require("../models/user")
const bcrypt= require("bcrypt")
const auth=require("../middleware/middleware")
     

async function adminSignin({email,password},callback){
    const userModel=await user.findOne({email})
    if(userModel!=null){
        if(bcrypt.compareSync(password,userModel.password)){
            const token = auth.generateAccessToken(userModel.toJSON())
            return callback(null,{...userModel.toJSON(),token})
        }else{
            return callback({message:'Ivalid password or email'})
        }
    }
    else{
        return callback({message:"Invalid email or password"})
    }
}

async function adminRegister(params, callback){
    if(!params.email== undefined){
        return callback({
            message:'Email Needed'
        })
    }
    
    let exist=await user.findOne({email:params.email})

    if(exist){
        return callback({message:"email is already in use"})
    }

    const salt=bcrypt.genSaltSync(10)
    params.password=bcrypt.hashSync(params.password,salt)

    const userSchema= new user(params)
    userSchema.save()
    .then((response)=>{
        return callback(null, response)
    })
    .catch((error)=>{
        return callback(error)
    })
}


module.exports={adminSignin,adminRegister}