import express from 'express'
import isAuth from '../midlewares/isAuth.js'
import { allOrders, placeOrder, placeOrderRazorpay, updateStatus, userOrder, verifyRazorpay } from '../controllers/orderController.js'
import adminAuth from '../midlewares/adminAuth.js'
const orderRoutes=express.Router()

orderRoutes.post('/placeorder',isAuth,placeOrder)
orderRoutes.post('/userorder',isAuth,userOrder)
orderRoutes.post('/razorpay',isAuth,placeOrderRazorpay)
orderRoutes.post('/list',adminAuth,allOrders)
orderRoutes.post('/status',adminAuth,updateStatus)

orderRoutes.post('/verifyrazorpay', isAuth,verifyRazorpay)
export default orderRoutes