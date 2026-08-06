import express from "express"
import { adminLogin, googleLogin, login, logout, registration } from "../controllers/authController.js"

import adminAuth from "../midlewares/adminAuth.js"
import { getAdmin } from "../controllers/userController.js"


const authRoutes=express.Router()

authRoutes.post("/registration",registration)
authRoutes.post('/login',login)
authRoutes.get('/logout',logout)
authRoutes.post('/googlelogin',googleLogin)
authRoutes.post('/adminlogin',adminLogin)

export default authRoutes