import React, { useContext, useEffect, useState } from "react";
import Nav from "../components/Nav";
import SideBar from "../components/SideBar";
import axios from "axios";
import { AuthDataContext } from "../components/AuthContext";

function Home() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const { serverUrl } = useContext(AuthDataContext);

  const fetchCounts = async () => {
    try {
      // Products Count
      const products = await axios.get(
        serverUrl + "api/product/list",
        { withCredentials: true }
      );

      setTotalProducts(products.data.length);

      // Orders Count
      const orders = await axios.post(
        serverUrl + "api/order/list",
        {},
        { withCredentials: true }
      );

      setTotalOrders(orders.data.orders.length);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className="w-screen h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white relative">
      <Nav />
      <SideBar />

      <div className="w-[70vw] h-screen absolute left-[25%] flex flex-col items-center py-24">
        <h1 className="text-4xl font-bold text-cyan-300 mb-12">
          OneCart Admin Panel
        </h1>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Products Card */}
          <div className="bg-[#1f2937] w-[300px] h-[170px] rounded-xl shadow-lg border border-cyan-500 flex flex-col justify-center items-center hover:scale-105 transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-300">
              Total Products
            </h2>

            <div className="mt-5 w-16 h-16 rounded-full bg-cyan-500 text-black flex items-center justify-center text-2xl font-bold">
              {totalProducts}
            </div>
          </div>

          {/* Orders Card */}
          <div className="bg-[#1f2937] w-[300px] h-[170px] rounded-xl shadow-lg border border-cyan-500 flex flex-col justify-center items-center hover:scale-105 transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-300">
              Total Orders
            </h2>

            <div className="mt-5 w-16 h-16 rounded-full bg-cyan-500 text-black flex items-center justify-center text-2xl font-bold">
              {totalOrders}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;