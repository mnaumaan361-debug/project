import React from 'react'
import contact from "../assets/contact.png"
import Title from '../components/Title'
import NewLaterBox from '../components/NewLaterBox'

function Contact() {
  return (
    <div className='w-[100vw] min-h-[100vh] flex items-center justify-center flex-col
    bg-gradient-to-r from-[#141414] to-[#0c2025] gap-[50px] pt-[80px]'>

      <Title text1={"CONTACT"} text2={"US"} />

      <div className='w-full flex items-center justify-center flex-col lg:flex-row'>

        {/* Image */}
        <div className='lg:w-[50%] w-full flex items-center justify-center'>
          <img
            src={contact}
            alt="Contact"
            className='lg:w-[65%] w-[80%] rounded-md shadow-lg shadow-black'
          />
        </div>

        {/* Contact Details */}
        <div className='lg:w-[50%] w-[85%] flex flex-col gap-5 mt-8 lg:mt-0 text-white'>

          <h2 className='text-2xl font-bold text-[#bff1f9]'>
            Get In Touch
          </h2>

          <p className='text-[15px] leading-7'>
            We'd love to hear from you! Whether you have a question about
            our products, your order, or anything else, our team is ready
            to help you with a quick and friendly response.
          </p>

          <div className='space-y-3'>
            <p><span className='font-semibold text-[#bff1f9]'>📍 Address:</span> Najibabad, UP, India</p>

            <p><span className='font-semibold text-[#bff1f9]'>📞 Phone:</span> +91 8171610322</p>

            <p><span className='font-semibold text-[#bff1f9]'>📧 Email:</span> support@onecart.com</p>

            <p><span className='font-semibold text-[#bff1f9]'>🕒 Working Hours:</span> Monday - Saturday (9:00 AM - 7:00 PM)</p>
          </div>

        </div>

      </div>
      <NewLaterBox/>
    </div>
  )
}

export default Contact