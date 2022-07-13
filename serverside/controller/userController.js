const User=require('../models/user')
const err=require('../middleware/catchError')
const _jwt= require('jsonwebtoken')
exports.createUser=err(async(req,res,next)=>{
    const{firstName,lastName,email,password}=req.body;
    User.findOne({email: req.body.email}).exec((error,user)=>{
        if(user){
            return res.status(403).json({message:'User already assigned with this email'})
        }else{
            return res.status.json({error})
        }
    })
    const user= await User.create({
        firstName,
        lastName,
        email,
        password,
        username:Math.random().toString()
    })
    const token=user.getJwtToken()
    res.status(201).json({
        message:'account created'
    })
})
exports.login=err(async(req,res,next)=>{
    const{email,password}=req.body
    if(!email || !password){
        return res.status(400).json({
            message:'please enter email and password'
        })
    }
    const user= await User.findOne({email}).select('+password')
    // const token =user.getJwtToken()
    
    if(!user){
        return res.status(401).json({
            message:'Wrong email or password'
        })
    }
    const passCheck=await user.comparePassword(password)
    if(!passCheck){
        return res.status(402).json({message:'Invalid password'})        
    }else{
        return res.status(200).json({message:"Logged in succesfully",success:true})
      
    }
    
})

exports.requireSignin=(req, res, next)=>{
    const token = req.headers.authorization.split(' ')[1]
    const user= _jwt.verify(token,process.env.JWT_TOKEN)
    req.user= user
    console.log(token)
    next()
}