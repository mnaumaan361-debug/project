import React from 'react'
import Home from './pages/Home'
import Order from './pages/Order'
import Add from './pages/Add'
import List from './pages/List'
import Login from './pages/Login'
import { Routes, Route, Navigate } from "react-router-dom"
import { useContext } from 'react'
import { adminDataContext } from './components/AdminContext'
import { ToastContainer, toast } from 'react-toastify';

function App() {
  
  let {adminData}=useContext(adminDataContext)
  return (
    <>
    <ToastContainer/>
<Routes>

  <Route
    path="/"
    element={adminData ? <Home /> : <Navigate to="/login" replace />}
  />

  <Route
    path="/orders"
    element={adminData ? <Order /> : <Navigate to="/login" replace />}
  />

  <Route
    path="/add"
    element={adminData ? <Add /> : <Navigate to="/login" replace />}
  />

  <Route
    path="/lists"
    element={adminData ? <List /> : <Navigate to="/login" replace />}
  />

  <Route
    path="/login"
    element={!adminData ? <Login /> : <Navigate to="/" replace />}
  />

</Routes>  
  </>
 
  )
}

export default App
