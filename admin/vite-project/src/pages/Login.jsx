import React, { useContext, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import Google from "../assets/google.png"
import Logo from "../assets/logo.png"
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";

import axios from 'axios';
import { AuthDataContext } from '../components/AuthContext';
import { adminDataContext } from '../components/AdminContext';
import { toast } from 'react-toastify';

function Login() {
     const[email,setEmail]=useState("")
        const[password,setPassword]=useState("")
        const [loading, setLoading] = useState(false);
            let[show,setShow]=useState(false)
            let {serverUrl}=useContext(AuthDataContext)
            let {getAdmin,adminData}=useContext(adminDataContext)
let naviget=useNavigate()

const adminLogin = async (e) => {
  e.preventDefault();
   setLoading(true);


  try {
    const result = await axios.post(
      serverUrl + "api/auth/adminlogin",
      { email, password },
      { withCredentials: true }
    );

    console.log(result);

    toast.success("Admin Login Successfully");

    getAdmin();
    naviget("/");

  } catch (error) {
    console.log(error);

    toast.error(
      error.response?.data?.message || "Invalid email or password"
    );}
    finally{
      setLoading(false)
    }
  
}

            
     
  return (
      <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">
          <div className='w-[100vw] h-[80px] flex items-center justify-start px-[30px] gap-[10px]  cursor-pointer' >
            <img className='w-[40px]' src={Logo} alt="" />
            <h1 className='text-[22px] font-sans'>oneCart</h1>
          </div>
            
            
           <div className='w-[100%] h-[100px] flex items-center justify-center flex-col'> 
            <span className='text-[25px] font-semibold'>Login</span>
            <span>Welcome to oneCart,Aplly to Admin Login</span>
             </div>
            
            {/* create login form */}<div className="max-w-[600px] w-[90%] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex flex-col items-center py-6">
      
        <form  onSubmit={adminLogin}  className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]">
      
          
      {/* inputs */}
      <div className="w-[90%] flex flex-col gap-[10px] relative">
      
        <input
        type="email"
        className="w-full h-[55px] border-2 border-[#96969635] shadow-lg backdrop-blur-sm bg-transparent placeholder:text-white/70 px-[20px] font-semibold " placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email} />
        
        <input
        type={show?"text":"password"}  className="w-full h-[55px] border-2 border-[#96969635] shadow-lg backdrop-blur-sm bg-transparent placeholder:text-white/70 px-[20px] font-semibold " placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
        {!show && < IoEyeOutline
        className="w-[20px] h-[20px] cursor-pointer absolute   right-[15px]  top-[38%] -translate-y-[45%]"
       onClick={()=>setShow(prev=>!prev)}/>}
      {show && <FaRegEyeSlash className="w-[20px] h-[20px] cursor-pointer absolute  right-[15px] top-[38%] -translate-y-[40%]"
       onClick={()=>setShow(prev=>!prev)} />
      }
        
        
        
        <button
  type="submit"
  disabled={loading}
  className="w-[100%] h-[55px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold disabled:opacity-70"
>
  {loading ? (
    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
  ) : (
    "Login"
  )}
</button>
        
        <p className='flex gap-[10px] '>You have no account ?<span
         className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer' onClick={()=>{naviget("/signup")}}>Create New Account</span></p>
        </div>
        </form>
        </div>
        
          </div>
      
    
    
  )
}

export default Login
