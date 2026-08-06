import React from 'react'
import about from "../assets/About.png"
import Title from '../components/Title'
import NewLaterBox from '../components/NewLaterBox'

function About() {
  return (
    <div className='w-[100vw] min-h-[100vh] flex items-center justify-center flex-col 
    bg-gradient-to-r from-[#141414] to-[#0c2025] gap-[50px] pt-[80px]'>
    <Title text1={"ABOUT"} text2={"US"}/>
    <div className='w-[100%] flex items-center justify-center flex-col lg:flex-row'>

<div className='lg:w-[50%] w-[100%] flex items-center justify-center '>
  <img src={about} alt="" className='lg:w-[65%] w-[80%] shadow-md shadow-black rounded-sm ' />
</div>
<div className='lg:w-[50%] w-[80%] flex items-center justify-center gap-[20px] flex-col mt-[20px] lg:mt-[0px]'>
  <p className='w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'>
    OneCart born for smart, seamless shoping-created to delivered quality products,
    trending styles and everyday essentials in one place. With reliable service. Fast delivery and 
    great value, OneCart makes your online shoping experince simple, satisfying and stress-free. 
  </p>

  <p className='w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'>Our Mission</p>
  <p className='w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'> At OneCart, our mission is to make online shopping simple, affordable, and enjoyable for everyone.
  We are committed to providing high-quality products at competitive prices while ensuring a smooth
  and secure shopping experience. Our goal is to offer a wide range of fashion, electronics, and
  everyday essentials that meet the needs of every customer. We believe in building trust through
  excellent customer service, fast and reliable delivery, and hassle-free returns. By continuously
  improving our platform and listening to customer feedback, we strive to exceed expectations every
  day. </p>
  <p className='w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'></p>
  </div>
   
   
    </div>

{/* para */}
    <div className='flex items-center justify-center w-[100%] flex-col gap-[10px]'>
      <Title text1={"WHY"} text2={"CHOOSE US"}/>
      <div className='w-[80%] flex items-center justify-center lg:flex-row flex-col gap-[20px] py-[40px]'>
<div className='lg:w-[33%] w-[90%] h-[250px] border-[1px] border-gray-100 flex items-center justify-center 
gap-[20px] flex-col px-[40px] py-[10px] text-white backdrop-blur-[2px] bg-[#ffffff0b] '>
  <b className='text-[20px] font-semibold text-[#bff1f9] '>Quality Assurance</b>
  <p>We Guranted quality through strict checks relaible sourcing, and a commitment to customer 
    satisfaction always. </p>
</div>

<div className='lg:w-[33%] w-[90%] h-[250px] border-[1px] border-gray-100 flex items-center justify-center 
gap-[20px] flex-col px-[40px] py-[10px] text-white backdrop-blur-[2px] bg-[#ffffff0b] '>
  <b className='text-[20px] font-semibold text-[#bff1f9] '>Exceptional Customer Service</b>
  
  <p> We are dedicated to providing exceptional customer service with every order.
  Our friendly support team is always ready to assist you with your questions and concerns. </p>
</div>

<div className='lg:w-[33%] w-[90%] h-[250px] border-[1px] border-gray-100 flex items-center justify-center 
gap-[20px] flex-col px-[40px] py-[10px] text-white backdrop-blur-[2px] bg-[#ffffff0b] '>
  <b className='text-[20px] font-semibold text-[#bff1f9] '>Convenience</b>
  <p>
  Shop anytime, anywhere with a simple and hassle-free experience.
  Fast delivery and secure checkout make every purchase convenient and reliable.</p>
</div>

      </div>
    </div>

<NewLaterBox/>
      </div>
  )
}

export default About
