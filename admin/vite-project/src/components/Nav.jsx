import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import axios from 'axios'
import { AuthDataContext } from './AuthContext'
import { adminDataContext } from './AdminContext'
import { toast } from 'react-toastify'
function Nav() {
    let naviget=useNavigate()
    let {getAdmin}=useContext(adminDataContext)
    let {serverUrl}=useContext(AuthDataContext)
    const logout=async()=>{
    try {
        let result=await axios.get(serverUrl+'api/auth/logout',{withCredentials:true})
      console.log(result)
      toast.success('Admin Logout Successfully')
    getAdmin()
      naviget('/login')
    } catch (error) {
      console.log(error)
      toast.error('Admin Logout Failed')
    }}
  return (
    <div className='w-[100vw] h-[70px] bg-[#dcdbdbf8] z-10 fixed top-0  flex items-center justify-between px-[30px]
    overflow-x-hidden shadow-md shadow-black'>
      
      {/* this div for logo */}
  <div className='w-[30%] flex items-center justify-start gap-[10px] cursor-pointer' onClick={()=>naviget('/')}>
<img src={logo} alt=""  className='w-[30px]'/>
<h1 className='text-[25px] text-[black] font-sans'>OneCart</h1>
  </div>
  
<button className='text-[15px] hover:border-[2px] border-[#89daea] cursor-pointer bg-[#000000ca] py-[10px]
px-[20px] rounded-2xl text-white' onClick={logout}>LogOut</button>
    </div>
  )
}

export default Nav
