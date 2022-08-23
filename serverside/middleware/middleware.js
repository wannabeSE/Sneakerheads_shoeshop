const _jwt = require("jsonwebtoken");


function requireSignin(req,res,next){
  const authHeader=req.headers['authorization']
  const token= authHeader && authHeader.split(' ')[1]
  if(token==null){
    return res.sendStatus(401)
  }
  _jwt.verify(token,process.env.JWT_TOKEN,(err,user)=>{
    if(err){
      return res.sendStatus(403)
    }
    req.user=user.data
    next()
  })
}


function generateAccessToken(userModel){
  return _jwt.sign({data:userModel},process.env.JWT_TOKEN,{
    expiresIn:"1h"
  })
}

module.exports={generateAccessToken,requireSignin}
