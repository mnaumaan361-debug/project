import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom'

function Footer() {
  let naviget=useNavigate()
  return (
    <footer className="w-full bg-[#dbfcfcec] ">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="OneCart Logo"
                className="w-10 h-10 md:w-12 md:h-12"
              />

              <h2 className="text-2xl font-semibold text-black">
                OneCart
              </h2>
            </div>

            {/* Desktop */}
            <p className="hidden md:block mt-4 text-gray-700 leading-7">
              OneCart is your all-in-one online shopping destination,
              offering top-quality products, unbeatable deals, and fast
              delivery—all backed by trusted service designed to make your
              life easier every day.
            </p>

            {/* Mobile */}
            <p className="md:hidden mt-4 text-gray-700">
              Fast. Easy. Reliable. OneCart Shopping.
            </p>
          </div>

          {/* Company */}
          <div>
            <h2 className="text-xl font-semibold text-black mb-4">
              COMPANY
            </h2>

            <ul className="space-y-3 text-gray-700">
              <li className="cursor-pointer hover:text-green-600 transition" onClick={()=>naviget('/')}>
                Home
              </li>

              <li className="cursor-pointer hover:text-green-600 transition" onClick={()=>naviget('/about')}>
                About Us
              </li>

              <li className="cursor-pointer hover:text-green-600 transition">
                Delivery
              </li>

              <li className="cursor-pointer hover:text-green-600 transition">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-xl font-semibold text-black mb-4">
              GET IN TOUCH
            </h2>

            <ul className="space-y-3 text-gray-700 break-all">
              <li>📞 +91-8171610322</li>
              <li>📧 mnaumaan361@gmail.com</li>
              <li>📞 +1-123-456-7890</li>
              <li>📧 admin@onecart.com</li>
            </ul>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-300 mt-8 pt-5 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} OneCart. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;