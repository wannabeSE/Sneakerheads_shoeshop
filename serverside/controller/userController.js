const User=require('../models/user')
const err=require('../middleware/catchError')
const _jwt= require('jsonwebtoken')
const bcrypt=require('bcrypt')
const shortid= require('shortid')

exports.createUser =async (req, res) => {
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
      if (user)
        return res.status(400).json({
          error: "User already registered",
        });
  
      const { firstName, lastName, email, password } = req.body;
      const hash_password = await bcrypt.hash(password, 10);
      const _user = new User({
        firstName,
        lastName,
        email,
        hash_password,
        username: shortid.generate(),
      });
  
      _user.save((error, user) => {
        if (error) {
          return res.status(400).json({
            message: "Something went wrong",
          });
        }
  
        if (user) {
     
          const token=user.getJwtToken()
          const { _id, firstName, lastName, email, role } = user;
          return res.status(201).json({
            token,
            user: { _id, firstName, lastName, email, role },
          });
        }
      });
    });
  };
  
exports.login=err(async(req,res,next)=>{
    const{email,password}=req.body
    if(!email || !password){
        return res.status(400).json({
            message:'please enter email and password'
        })
    }
    const user= await User.findOne({email}).select('+password')
    const token =user.getJwtToken()
    const {role}=user
    if(!user){
        return res.status(401).json({
            message:'Wrong email or password'
        })
    }
    const passCheck=await user.comparePassword(password)
    if(!passCheck){
        return res.status(402).json({message:'Invalid password'})        
    }else if(passCheck && user.role=='user'){
        
        return res.status(200).json({user:{role},token,message:"Logged in succesfully",success:true})
      
    }
    
})

