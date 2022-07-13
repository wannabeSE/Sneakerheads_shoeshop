const User= require('../models/user')
const err=require('../middleware/catchError')
const _jwt= require('jsonwebtoken')

exports.adminSignup=err(async(req,res,next)=>{
    const{firstName,lastName,email,password}=req.body;
    const user= await User.create({
        firstName,
        lastName,
        email,
        password,
        role:'admin',
        username:Math.random().toString()
    })
    const token=user.getJwtToken()
    res.status(201).json({
        message:'Admin account created'
    })
})
exports.adminLogin=err(async(req,res,next)=>{
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
    if(!passCheck && user.role=='admin'){
        return res.status(402).json({message:'Invalid password'})        
    }else{
        return res.status(200).json({message:"Logged in as admin succesfully"})
      
    }
    
})

