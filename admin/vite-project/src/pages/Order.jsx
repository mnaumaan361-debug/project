import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { adminDataContext } from "../components/AdminContext";
import Nav from "../components/Nav";

function Order() {
  const [orders, setOrders] = useState([]);

  const { serverUrl, currency } = useContext(adminDataContext);

  // ================= Fetch Orders =================
  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(
        serverUrl + "api/order/list",
        {},
        { withCredentials: true }
      );

      if (result.data.success) {
        setOrders(result.data.orders.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ================= Update Status =================
  const updateStatus = async (orderId, status) => {
    try {
      const result = await axios.post(
        serverUrl + "api/order/status",
        { orderId, status },
        { withCredentials: true }
      );

      if (result.data.success) {
        fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#141414] via-[#1b1b1b] to-[#0c2025] text-white">
      <Nav />

      <div className="max-w-7xl mx-auto pt-24 px-4 md:px-8 pb-10">
        <h1 className="text-4xl font-bold text-center mb-10">
          📦 All Orders
        </h1>

        <div className="flex flex-col gap-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-[#1b1b1b]/90 border border-gray-700 rounded-2xl p-6 shadow-xl hover:shadow-cyan-500/20 transition duration-300"
            >
              <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-8">
                {/* ================= Products ================= */}
                <div>
                  <h2 className="text-xl font-bold text-cyan-400 mb-5">
                    🛒 Products
                  </h2>

                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 bg-[#2a2a2a] rounded-xl p-3 mb-4"
                    >
                      <img
                        src={item.image1}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover border border-gray-600"
                      />

                      <div>
                        <h3 className="font-semibold text-lg">
                          {item.name}
                        </h3>

                        <p className="text-gray-300">
                          Quantity :
                          <span className="font-semibold text-white">
                            {" "}
                            {item.quantity}
                          </span>
                        </p>

                        <p className="text-gray-300">
                          Size :
                          <span className="font-semibold text-white">
                            {" "}
                            {item.size}
                          </span>
                        </p>

                        <p className="text-green-400 font-semibold">
                          {currency}
                          {item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ================= Address ================= */}
                <div>
                  <h2 className="text-xl font-bold text-cyan-400 mb-5">
                    📍 Delivery Address
                  </h2>

                  <div className="bg-[#2a2a2a] rounded-xl p-4 leading-8 text-gray-300">
                    <p>
                      <b className="text-white">
                        {order.address.firstname} {order.address.lastname}
                      </b>
                    </p>

                    <p>{order.address.email}</p>

                    <p>{order.address.street}</p>

                    <p>
                      {order.address.city}, {order.address.state}
                    </p>

                    <p>{order.address.country}</p>

                    <p>{order.address.pincode}</p>

                    <p>{order.address.phone}</p>
                  </div>
                </div>

                {/* ================= Payment ================= */}
                <div>
                  <h2 className="text-xl font-bold text-cyan-400 mb-5">
                    💳 Payment
                  </h2>

                  <div className="bg-[#2a2a2a] rounded-xl p-4 space-y-3">
                    <p>
                      Amount :
                      <span className="font-bold text-green-400 ml-2">
                        {currency}
                        {order.amount}
                      </span>
                    </p>

                    <p>
                      Method :
                      <span className="font-bold ml-2">
                        {order.paymentMethod}
                      </span>
                    </p>

                    <p>
                      Payment :
                      <span
                        className={`ml-2 font-bold ${
                          order.payment
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {order.payment ? "Completed" : "Pending"}
                      </span>
                    </p>

                    <p className="text-gray-400">
                      {new Date(order.date).toDateString()}
                    </p>
                  </div>
                </div>

                {/* ================= Status ================= */}
                <div>
                  <h2 className="text-xl font-bold text-cyan-400 mb-5">
                    🚚 Order Status
                  </h2>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                    className="w-full bg-[#2a2a2a] border border-gray-600 rounded-xl p-3 outline-none focus:border-cyan-500"
                  >
                    <option className="text-black" value="Order Placed">
                      Order Placed
                    </option>

                    <option className="text-black" value="Packing">
                      Packing
                    </option>

                    <option className="text-black" value="Shipped">
                      Shipped
                    </option>

                    <option
                      className="text-black"
                      value="Out for Delivery"
                    >
                      Out for Delivery
                    </option>

                    <option className="text-black" value="Delivered">
                      Delivered
                    </option>
                  </select>

                  <div className="mt-5 bg-[#2a2a2a] rounded-xl p-4">
                    <p className="font-semibold">
                      Current Status :
                    </p>

                    <p className="text-cyan-400 font-bold text-lg mt-2">
                      {order.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-gray-400">
                No Orders Found
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Order;