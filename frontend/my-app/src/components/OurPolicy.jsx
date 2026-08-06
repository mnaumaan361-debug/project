import React from 'react'
import Title from './Title'
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

function OurPolicy() {
  return (<div
  className="w-screen h-screen md:h-[70vh] flex items-center justify-start flex-col gap-[50px]
  bg-gradient-to-r from-[#141414] to-[#0c2025]"
>

        <div className='h-[8%] w-[100%] text-center mt-[70px]  '>
            <Title text1={"OUR"} text2={"POLICY"}/>
            <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100 '>
                Customer Friendly Policies - Commited to Your Satisfaction and Safety.
            </p>
        </div>
      
      <div className='w-[100%] md:min-h-[50%] h-[20%] flex items-center justify-center flex-wrap 
      lg:gap-[50px] gap-[80px] '>   
      
      <div className="w-[400px] max-w-[90%] h-[60%] flex flex-col items-center justify-center gap-[10px]">
  <RiExchangeFundsLine className="w-[30px] h-[30px] md:w-[60px] md:h-[60px] text-[#90b9ff]" />

  <p className="w-full text-center font-semibold md:text-[25px] text-[19px] text-[#a5e8f7]">
    Easy Exchange Policy
  </p>

  <p className="w-full text-center font-semibold md:text-[18px] text-[12px] text-[#a5e8f7]">
    Exchange Made Easy - Quick, Simple, and Customer-Friendly Process.
  </p>
</div>

<div className="w-[400px] max-w-[90%] h-[60%] flex flex-col items-center justify-center gap-[10px]">
  <TbRosetteDiscountCheckFilled className="w-[30px] h-[30px] md:w-[60px] md:h-[60px] text-[#90b9ff]" />
  <p className="w-full text-center font-semibold md:text-[25px] text-[19px] text-[#a5e8f7]">
    7 Days Return Policy
  </p>
<p className="w-full text-center font-semibold md:text-[18px] text-[12px] text-[#a5e8f7]">
    Shop with Confidence - 7 Days Return Guarantee.
  </p>
</div>
      
<div className="w-[400px] max-w-[90%] h-[60%] flex flex-col items-center justify-center gap-[10px]">
  <BiSupport className="w-[30px] h-[30px] md:w-[60px] md:h-[60px] text-[#90b9ff]" />
<p className="w-full text-center font-semibold md:text-[25px] text-[19px] text-[#a5e8f7]">
    Best Customer Support
  </p>
  <p className="w-full text-center font-semibold md:text-[18px] text-[12px] text-[#a5e8f7]">
    Trusted Customer Support Your Satisfaction is Our Priority.
  </p>
</div>
      
 
 
      </div>
    </div>
  )
}

export default OurPolicy
