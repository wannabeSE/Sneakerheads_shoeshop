const _jwt = require("jsonwebtoken");
const { user } = require("../models/user");

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
// exports.requireSignin=(req, res, next)=>{
//     if (req.headers.authorization) {
//         const token = req.headers.authorization.split(" ")[1];
//         const user = _jwt.verify(token, process.env.JWT_TOKEN);
//         req.user = user;
//       } else {
//         return res.status(400).json({user, message: "Authorization required" });
//       }
//       next();
//       //jwt.decode()
// };



// exports.userMiddleware = (req, res, next) => {
//     if (req.user.role != "user") {
//       return res.status(400).json({ message: "User access denied" });
//     }
//     next();
//   };

// exports.adminMiddleware = (req, res, next) => {
//     if (req.user.role !== "admin") {
//         if (req.user.role !== "super-admin") {
//         return res.status(400).json({ message: "Admin access denied" });
//         }
//     }
//     next();
// };

// exports.superAdminMiddleware = (req, res, next) => {
//     if (req.user.role !== "super-admin") {
//         return res.status(200).json({ message: "Super Admin access denied" });
//     }
//     next();
// };

