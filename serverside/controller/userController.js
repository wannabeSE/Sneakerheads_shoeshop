const User=require('../models/user')
const err=require('../middleware/catchError')
exports.createUser=err(async(req,res,next)=>{
    const{firstName,lastName,email,password}=req.body;
    const user= await User.create({
        firstName,
        lastName,
        email,
        password,
        username:Math.random().toString()
    })
    const token=user.getJwtToken()
    res.status(201).json({
        success:true,
        user,
        token,
    })
})
exports.login=err(async(req,res,next)=>{
    const{email,password}=req.body
    if(!email || !password){
        return res.status(400).json({
            message:'please enter a email and password'
        })
    }
    const user= await User.findOne({email}).select('+password')
    if(!user){
        return res.status(401).json({
            message:'No user found with this email'
        })
    }
    const passCheck=await user.comparePassword(password)
    if(!passCheck){
        return res.status(402).json({message:'Invalid password'})        
    }else{
        return res.status(200).json({message:"logged in succesfully"})
    }
    const token= user.getJwtToken()
    res.status(201).json({
        success:true,
        user,
        token,
    })
})