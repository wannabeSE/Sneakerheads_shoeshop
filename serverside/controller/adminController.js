const adminService= require("../services/adminService")

exports.createAdmin=(req,res,next)=>{
  adminService.adminRegister(req.body,(error, results)=>{
    if(error){
      return next (error)
    }else{
      return res.status(201).send({message:"success",data: results})
    }
  })
}

exports.adminLogin=(req,res,next)=>{
  const {email,password}=req.body
  adminService.adminSignin({email,password},(error,results)=>{
    if(error){
      return next(error)
    }
    else{
      return res.status(201).send({message:"Success",data:results})
    }
  })
}
