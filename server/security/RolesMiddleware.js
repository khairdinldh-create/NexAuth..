const Roles={
    admin:"admin",
    user:"user"
}

const RolesMiddleware = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // roles is now an array → use includes()
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }

    next();
  };
};





module.exports=Roles
module.exports=RolesMiddleware