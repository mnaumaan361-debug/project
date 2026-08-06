import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { shopDataContext } from "../context/ShopContext";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";

function Order() {
  const [orderData, setOrderData] = useState([]);

  const { currency } = useContext(shopDataContext);
  const { serverUrl } = useContext(authDataContext);
const [trackStatus, setTrackStatus] = useState("");



  const loadOrderData = async () => {
    try {
     const result = await axios.post(
  serverUrl + "/api/order/userorder",
  {},
  { withCredentials: true }
);

let allOrderItem = [];

result.data.forEach((order) => {
  order.items.forEach((item) => {
    item.status = order.status;
    item.paymentMethod = order.paymentMethod;
    item.date = order.date;

    allOrderItem.push(item);
  });
});

setOrderData(allOrderItem.reverse()); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#141414] to-[#0c2025] pt-[110px] pb-10 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="mb-10">
          <Title text1={"MY"} text2={"ORDERS"} />
        </div>

        <div className="flex flex-col gap-6">

          {orderData.map((item, index) => (
            <div
              key={index}
              className="bg-[#1c1c1c] border border-gray-700 rounded-2xl p-6 hover:border-cyan-500 duration-300"
            >
              <div className="flex flex-col lg:flex-row justify-between gap-8">

                {/* Left */}
                <div className="flex gap-5">

                  <img
                    src={item.image1}
                    alt=""
                    className="w-28 h-36 rounded-xl object-cover"
                  />

                  <div className="text-white">

                    <h2 className="text-2xl font-semibold">
                      {item.name}
                    </h2>

                    <div className="mt-3 flex gap-4 text-gray-300">

                      <p>
                        {currency}
                        {item.price}
                      </p>

                      <p>Qty : {item.quantity}</p>

                      <p>Size : {item.size}</p>

                    </div>

                    <p className="mt-3 text-gray-400">
                      Date :{" "}
                      <span className="text-white">
                        {new Date(item.date).toDateString()}
                      </span>
                    </p>

                    <p className="mt-2 text-gray-400">
                      Payment :{" "}
                      <span className="text-green-400">
                        {item.paymentMethod}
                      </span>
                    </p>

                  </div>

                </div>

                {/* Right */}

                <div className="flex flex-col justify-between items-start lg:items-end">

                  <div className="flex items-center gap-2">

                    <span className="w-3 h-3 rounded-full bg-green-500"></span>

                    <span className="text-white">
                      {item.status}
                    </span>

                  </div>

                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Order;