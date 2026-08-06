import React from 'react'
import Home from './pages/Home'
import Order from './pages/Order'
import Add from './pages/Add'
import List from './pages/List'
import Login from './pages/Login'
import {Routes,Route} from "react-router-dom"
import { useContext } from 'react'
import { adminDataContext } from './components/AdminContext'
import { ToastContainer, toast } from 'react-toastify';

function App() {
  
  let {adminData}=useContext(adminDataContext)
  return (
    <>
    <ToastContainer/>
{!adminData ? <Login/> : <>
 <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/orders" element={<Order/>}></Route>
    <Route path="/add" element={<Add/>}></Route>
    <Route path="/lists" element={<List/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    </Routes>
  
  </>}</>
 
  )
}

export default App
