const _jwt = require("jsonwebtoken");


exports.requireSignin=(req, res, next)=>{
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = _jwt.verify(token, process.env.JWT_TOKEN);
        req.user = user;
      } else {
        return res.status(400).json({user, message: "Authorization required" });
      }
      next();
      //jwt.decode()
};



exports.userMiddleware = (req, res, next) => {
    if (req.user.role != "user") {
      return res.status(400).json({ message: "User access denied" });
    }
    next();
  };

exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        if (req.user.role !== "super-admin") {
        return res.status(400).json({ message: "Admin access denied" });
        }
    }
    next();
};

exports.superAdminMiddleware = (req, res, next) => {
    if (req.user.role !== "super-admin") {
        return res.status(200).json({ message: "Super Admin access denied" });
    }
    next();
};

