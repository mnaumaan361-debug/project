import React, { useEffect } from 'react'
import Nav from '../components/Nav.jsx'
import SideBar from '../components/SideBar.jsx'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthDataContext } from '../components/AuthContext.jsx'
import axios from 'axios'
function List() {
  let [list,setList]=useState([])
  let {serverUrl}=useContext(AuthDataContext)
  const fetchList=async(req,res)=>{
    try {
      let result=await axios.get(serverUrl +"api/product/list")
      setList(result.data)

    } catch (error) {
      console.log(error)
    }
  }
  const removeList=async(id)=>{
    let result=await axios.post(`${serverUrl}api/product/remove/${id}`,{},{withCredentials:true})
if(result.data){
  fetchList()
}else{
  console.log("failed to remove product")
}
  }
  useEffect(()=>{
    fetchList()
  },[])
  
  return (
   <div className="w-screen min-h-screen bg-gradient-to-br from-[#141414] to-[#0c2025] text-white">
      <Nav/>
      
      <div className='w-full min-h-screen flex items-center justify-start'>
        <SideBar/>
        <div className='w-[82%] min-h-screen lg:ml-[320px] md:ml-[230px] mt-[70px]
         ml-[100px] flex flex-col gap-6 overflow-x-hidden pb-10'>
          <div className='w-[400px] h-[50px] text-[28px] md:text-[40px] mb-[20px] 
          text-[white]'>All Lists Products</div>
          {list?.length > 0 ? (list.map((item,index)=>(
            <div className='w-[90%] min-h-[120px] h-[90px] bg-slate-600 rounded-xl flex 
            items-center justify-start
            gap-[5px] md:gap-[30px] p-[10px] md:px-[30px]    ' key={index}>
              <img src={item.image1} className='w-[30%] md:w-[120px] h-[90%] rounded-lg' alt="" />
              <div className='w-[90%] h-[80%] flex flex-col items-start justify-center gap-[2px] '>
                <div className='w-[100%] md:text-[20px] text-[15px] text-[#bef0f3]'>{item.name}</div>
                <div className='md:text-[17px] text-[15px] text-[#bef0f3]'>{item.category}</div>
                 <div className='md:text-[17px] text-[15px] text-[#bef0f3]'>₹{item.price}</div>
             
              </div>
<div className='w-[10%] h-[100%]  bg-transparent flex items-center justify-center  '><span className='w-[35px]
  h-[30%] flex items-center justify-center rounded-md md:hover:bg-red-300 md:hover:text-black cursor-pointer 
  hover:text-red-300' onClick={()=>removeList(item._id)}>X</span></div>


            </div>
          ))):(<div className='text-white text-lg '>No Product Available</div>)}
        </div>
              </div>
    </div>
  )
}

export default List
