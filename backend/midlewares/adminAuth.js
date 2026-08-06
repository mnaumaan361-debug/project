import jwt from "jsonwebtoken";

const  adminAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token; // ya req.cookies.jwt

    if (!token) {
      return res.status(401).json({
        msg: "Not Authorized Login  again",
      });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
if(!verifyToken){
        
    return res.status(401).json({msg:"Not Autherized Login  again, Not Valid Token"})
}
    req.adminEmail = process.env.ADMIN_EMAIL;

    next();
  } catch (error) {
    console.log("Auth Error:", error);

    return res.status(401).json({
      msg: "Invalid Token",
      error: error.message,
    });
  }
};

export default adminAuth;