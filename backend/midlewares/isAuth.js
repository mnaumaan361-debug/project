

//isme m hm user ka token verify krenge or user ki id get krke id k bases pr user ko find krenge user controller m
import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token; // ya req.cookies.jwt

    if (!token) {
      return res.status(401).json({
        msg: "Token not found",
      });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = verifyToken.userId;

    next();
  } catch (error) {
    console.log("Auth Error:", error);

    return res.status(401).json({
      msg: "Invalid Token",
      error: error.message,
    });
  }
};

export default isAuth;