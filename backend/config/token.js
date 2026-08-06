

// is file m hm user create hone k baad token creation ka code likhenge
import JWT from "jsonwebtoken"
import JWT_SECRET from "dotenv"
//   ye function access token generate krta h
 export const gentoken=async(userId)=>{  //userId hme authController m se jha hmne user create kiya  vha se mil jaigi
try{
    const token=await JWT.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"})
    return token
}
catch(error){
    console.log("token error",error)
}
}
export const gentoken1=async(email)=>{  //userId hme authController m se jha hmne user create kiya  vha se mil jaigi
try{
    const token=await JWT.sign({email},process.env.JWT_SECRET,{expiresIn:"7d"})
    return token
}
catch(error){
    console.log("token error",error)
}
}