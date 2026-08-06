

//isme hm real time user yani curr user ko lenge


import { User } from "../models/userModel.js"

 export const getCurrUser=async(req,res)=>{
    try {
        let user=await User.findById(req.userId).select("-password")
        if(!user){
             return res.status(400).json({msg:"user is not found"})
        }
return res.status(200).json(user)
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"get current user error ",error})
    }
}

 export const getAdmin=async(req,res)=>{
    let adminEmail=req.adminEmail;
     try {
        
        if(!adminEmail){
             return res.status(400).json({msg:"adminEmail is not found"})
        }
return res.status(200).json({
    email:adminEmail,
    role:"admin"
})
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"getAdmin error ",error})
    }
}
