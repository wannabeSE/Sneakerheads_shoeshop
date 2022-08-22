const userService= require("../services/userService")

exports.createUser=(req,res,next)=>{
  userService.register(req.body,(error, results)=>{
    if(error){
      return next (error)
    }else{
      return res.status(201).send({message:"success",data: results})
    }
  })
}

exports.login=(req,res,next)=>{
  const {email,password}=req.body
  userService.signin({email,password},(error,results)=>{
    if(error){
      return next(error)
    }
    else{
      return res.status(201).send({message:"Success",data:results})
    }
  })
}
