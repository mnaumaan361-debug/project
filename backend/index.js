import express from 'express'
import dotenv from 'dotenv'
 import connectdb from './config/db.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoute.js'
import cors from "cors"
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/addProductRoute.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
const app=express()
dotenv.config()

console.log("KEY_ID:", process.env.RAZORPAY_KEY_ID);
console.log("KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);
let port=process.env.PORT || 6000


//jo bhi body se data ayga vo ab json m hi ayga
app.use(express.json())
app.use(cookieParser())

app.use(cors({
origin:["http://localhost:5173","http://localhost:5174"],
credentials:true
}))
app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/product",productRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/order',orderRoutes)
app.listen(port,()=>{
    console.log('server started bro:',port)
     connectdb()
})

