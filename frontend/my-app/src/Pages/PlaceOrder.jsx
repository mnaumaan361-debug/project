import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import razerpay from "../assets/razerpay.png";
import { shopDataContext } from "../context/ShopContext";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PlaceOrder() {
  const [method, setMethod] = useState("cod");
  let naviget=useNavigate()


  const {
    cartItem,
    getCartAmount,
    delivery_fee,
    product,
    setCartItem
  } = useContext(shopDataContext);

  const { serverUrl } = useContext(authDataContext);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const onSubmitHandler = async (e) => {
    e.preventDefault();

    console.log("FORM SUBMITTED");

    try {
      let orderItems = [];

      for (const itemId in cartItem) {
        for (const size in cartItem[itemId]) {
          if (cartItem[itemId][size] > 0) {
            const itemInfo = structuredClone(
              product.find((item) => item._id === itemId)
            );

            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItem[itemId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }


      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      console.log("Method :", method);
      console.log("Order Data :", orderData);

      if (method === "cod") {
        console.log("API CALLING...");

        const result = await axios.post(
          `${serverUrl}/api/order/placeorder`,
          orderData,
          { withCredentials: true }
        );

        console.log(result.data);
        if(result.data){
          setCartItem({})
          naviget('/order')
        }else{
          console.log(result.data.message)
        }
      }
      if(method==='razorpay'){
    console.log('razorpay call')
    const resultRazorpay=await axios.post(serverUrl+'/api/order/razorpay',orderData,{withCredentials:true})
    console.log("razorpay data " , resultRazorpay.data)
    if(resultRazorpay.data.success){
      initPay(resultRazorpay.data.order)
    }
  }

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
    
  };   


  console.log(import.meta.env.VITE_RAZORPAY_KEY_ID);
 const initPay = (order) => {
  const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount: order.amount,
  currency: order.currency,
  name: "Order Payment",
  order_id: order.id,

  prefill: {
    name: "Test User",
    email: "test@example.com",
    contact: "9876543210",
  },

  handler: async (response) => {
    console.log(response);
    // verify user payment 
    const {data}=await axios.post(serverUrl+'/api/order/verifyrazorpay',response,{withCredentials:true})
    if(data.success){
      setCartItem({})
      naviget('/order')
      
    }
  },
};
  const rzp = new window.Razorpay(options);

  rzp.on("payment.failed", function (response) {
    console.log("Payment Failed");
    console.log(response.error);
  });

  rzp.open();
};
  return (
    <form
      onSubmit={onSubmitHandler}
      className="w-full min-h-screen bg-gradient-to-r from-[#141414] to-[#0c2025] flex flex-col lg:flex-row gap-10 px-5 pt-[120px] pb-20"
    >
      {/* LEFT */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <div className="w-full lg:w-[70%]">

          <div className="mb-6">
            <Title text1="DELIVERY" text2="INFORMATION" />
          </div>

          <div className="flex gap-4 mb-5">
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={onChangeHandler}
              placeholder="First Name"
              className="w-1/2 h-12 rounded bg-slate-700 text-white px-4"
              required
            />

            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={onChangeHandler}
              placeholder="Last Name"
              className="w-1/2 h-12 rounded bg-slate-700 text-white px-4"
              required
            />
          </div>

          <div className="mb-5">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
              placeholder="Email"
              className="w-full h-12 rounded bg-slate-700 text-white px-4"
              required
            />
          </div>

          <div className="mb-5">
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={onChangeHandler}
              placeholder="Street"
              className="w-full h-12 rounded bg-slate-700 text-white px-4"
              required
            />
          </div>

          <div className="flex gap-4 mb-5">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={onChangeHandler}
              placeholder="City"
              className="w-1/2 h-12 rounded bg-slate-700 text-white px-4"
              required
            />

            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={onChangeHandler}
              placeholder="State"
              className="w-1/2 h-12 rounded bg-slate-700 text-white px-4"
              required
            />
          </div>

          <div className="flex gap-4 mb-5">
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={onChangeHandler}
              placeholder="Pincode"
              className="w-1/2 h-12 rounded bg-slate-700 text-white px-4"
              required
            />

            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={onChangeHandler}
              placeholder="Country"
              className="w-1/2 h-12 rounded bg-slate-700 text-white px-4"
              required
            />
          </div>

          <div>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={onChangeHandler}
              placeholder="Phone"
              className="w-full h-12 rounded bg-slate-700 text-white px-4"
              required
            />
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/2 flex flex-col items-center">

        <div className="w-full lg:w-[70%]">
          <CartTotal />
        </div>

        <div className="mt-8 mb-5">
          <Title text1="PAYMENT" text2="METHOD" />
        </div>

        <div className="flex gap-5 flex-wrap justify-center">

          <button
            type="button"
            onClick={() => setMethod("razorpay")}
            className={`w-[170px] h-[55px] rounded-xl overflow-hidden border-4 ${
              method === "razorpay"
                ? "border-blue-900"
                : "border-transparent"
            }`}
          >
            <img
              src={razerpay}
              alt="Razorpay"
              className="w-full h-full object-cover"
            />
          </button>

          <button
            type="button"
            onClick={() => setMethod("cod")}
            className={`w-[220px] h-[55px] rounded-xl border-4 bg-gradient-to-t from-[#95b3f8] to-white text-[#332f6f] font-bold ${
              method === "cod"
                ? "border-blue-900"
                : "border-transparent"
            }`}
          >
            CASH ON DELIVERY
          </button>

        </div>

        <button
          type="submit"
          className="mt-10 bg-[#3bcee848] border border-[#80808049] text-white px-12 py-3 rounded-2xl text-lg hover:bg-[#3bcee870] duration-300"
        >
          Place Order
        </button>

      </div>
    </form>
  );
}

export default PlaceOrder;