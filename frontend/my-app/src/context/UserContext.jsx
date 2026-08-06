import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import axios from "axios"

export const userDataContext=createContext()
function UserContext({children}) {
  let[userData,setUserData]=useState("")
  let{serverUrl}=useContext(authDataContext)


  const getCurrUser= async()=>{
try {
  let result=await axios.get(serverUrl + '/api/user/getcurruser',{withCredentials:true})
  setUserData(result.data)
  console.log(result.data)
} catch (error) {
  setUserData(null)
  console.log(error)
}

  }
  useEffect(()=>{
  getCurrUser()
  },[])

  let value={
    userData,setUserData,getCurrUser,
  }
  return (
    <div><userDataContext.Provider value={value}>
  {children}
</userDataContext.Provider>
    </div>
  )
}

export default UserContext
