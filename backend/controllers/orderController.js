import Order from "../models/orderModel.js"
import { User } from "../models/userModel.js"
import Razorpay from "razorpay"
import dotenv from 'dotenv'
dotenv.config()
// for users order

export  const placeOrder=async(req,res)=>{
    console.log('order Api hii')
    console.log(req.body)
    try {
        const userId=req.userId
        const{items,address,amount}=req.body
        const orderData={
            items,
            userId,amount,
            address,
            paymentMethod:'cod',
            payment:false,
            date:Date.now()
        }
        const newOrder=new Order(orderData)
        await newOrder.save()
        //jaise hi oder book ho jai to fir cartdata empty krdo
await User.findByIdAndUpdate(userId,{cartData:{}})
        return res.status(201).json({msg:"Order Place"})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"order place error"})
    }
}
export const userOrder=async(req,res)=>{
    try {
        const userId=req.userId
        const order=await Order.find({userId})
      return  res.status(200).json(order)

    } catch (error) {
        console.log(error)
       return res.status(500).json({mg:"userOrders error"})
    }

}

// for admin orders

export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      msg: "Admin All Orders Error",
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await Order.findByIdAndUpdate(orderId, {
      status,
    });

    res.status(200).json({
      success: true,
      msg: "Status Updated",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      msg: "Update Status Error",
    });
  }
};


//payment using razorpay
// Razorpay Instance 
const razorpayInstance = new Razorpay({   
  key_id: process.env.RAZORPAY_KEY_ID,
   key_secret: process.env.RAZORPAY_KEY_SECRET,
 });

console.log({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});



const currency = "INR";

// Razorpay Payment
export const placeOrderRazorpay = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    const orderData = {
      items,
      amount,
      address,
      userId,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    // Save Order
    const newOrder = new Order(orderData);
    await newOrder.save();

    // Clear Cart
    await User.findByIdAndUpdate(userId, {
      cartData: {},
    });

    // Razorpay Order Options
    const options = {
      amount: amount * 100,
      currency,
      receipt: newOrder._id.toString(),
    };

    // Create Razorpay Order
    const order = await razorpayInstance.orders.create(options);

    return res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};





export const  verifyRazorpay=async(req,res)=>{
  try {
    const userId=req.userId
    const {razorpay_order_id}=req.body
    const orderInfo=await  razorpayInstance.orders.fetch(razorpay_order_id)
    
console.log("Order Info:", orderInfo);
console.log("Receipt:", orderInfo.receipt);
console.log("Status:", orderInfo.status);

    
    if(orderInfo.status==='paid'){
      await Order.findByIdAndUpdate(orderInfo.receipt,{payment:true})
      await User.findByIdAndUpdate(userId,{cartData:{}})
      res.status(200).json({message:'Payment Successful',
        success:true
      })
    }
    else{
      res.status(500).json({msg:"Payment Failed"})
    }
  } catch (error) {
   console.log(error) 
   res.status(500).json({msg:"Payment Failed",
     success:false
   })
  }
}