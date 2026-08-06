import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { AuthDataContext } from './AuthContext.jsx'
import { useEffect } from 'react'
import axios from 'axios'

 export const adminDataContext=createContext()

function AdminContext({children}) {
  let[adminData,setAdminData]=useState(null)
  let{serverUrl}=useContext(AuthDataContext)
let getAdmin=async(req,res)=>{
try {
    let result=await axios.get(serverUrl+"api/user/getadmin",{withCredentials:true})
    setAdminData(result.data)
    console.log(result.data)

  }
 catch (error) {
 console.log(error) 
 setAdminData(null)
}}
useEffect(()=>{
getAdmin()
},[])

 
const currency = "₹";

let value = {
  serverUrl,
  currency,
  adminData,
  setAdminData,
  getAdmin,
};
  return (
  <adminDataContext.Provider value={value}>
    {children}
  </adminDataContext.Provider>
  )
}

export default AdminContext
