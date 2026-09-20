import React, { useContext, useState } from 'react'

import { useNavigate } from 'react-router-dom'

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
    console.log("1. Login button clicked");
   setLoading(true);


  try {
      
    const result = await axios.post(
      serverUrl + "api/auth/adminlogin",
      { email, password },
      { withCredentials: true ,
        timeout: 5000
      }
    );

    console.log(result);
    toast.success("Admin Login Successfully");
  
   await  getAdmin();
    naviget("/");
      

  }catch (error) {
    console.log("❌ ERROR:", error);
    console.log("❌ STATUS:", error.response?.status);
    console.log("❌ DATA:", error.response?.data);

    toast.error(
        error.response?.data?.message || "Invalid email or password"
    );
}
finally {
    console.log("✅ FINALLY");
    setLoading(false);
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
    required
    className="w-full h-[55px] rounded-lg border-2 border-[#96969635] shadow-lg backdrop-blur-sm bg-transparent placeholder:text-white/70 px-[20px] font-semibold"
    placeholder="Email"
    onChange={(e) => setEmail(e.target.value)}
    value={email}
  />

  <input
    required
    type={show ? "text" : "password"}
    className="w-full h-[55px] rounded-lg border-2 border-[#96969635] shadow-lg backdrop-blur-sm bg-transparent placeholder:text-white/70 px-[20px] font-semibold"
    placeholder="Password"
    onChange={(e) => setPassword(e.target.value)}
    value={password}
  />

  {!show && (
    <IoEyeOutline
      className="w-[20px] h-[20px] text-gray-400 cursor-pointer absolute right-[15px] top-[45%]"
      onClick={() => setShow((prev) => !prev)}
    />
  )}

  {show && (
    <FaRegEyeSlash
      className="w-[20px] h-[20px] text-gray-400 cursor-pointer absolute right-[15px] top-[45%]"
      onClick={() => setShow((prev) => !prev)}
    />
  )}

  <button
    type="submit"
    disabled={loading}
    className="w-[90%] h-[50px] self-center bg-blue-600 rounded-lg font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
  >
    {loading ? "Logging in..." : "Login"}
  </button>

        </div>
        </form>
        </div>
        
          </div>
      
    
    
  )
}

export default Login
