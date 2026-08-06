import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { RiStarSFill } from "react-icons/ri";
import { MdOutlineStarHalf } from "react-icons/md";
import RelatedProduct from '../components/RelatedProduct';

function ProductDetails() {
    let {productId}=useParams()
    let{product,currency,addtoCart}=useContext(shopDataContext)
    let[productData,setProductData]=useState(null)
    const[image,setImage]=useState('')
    const[image1,setImage1]=useState('')
    const[image2,setImage2]=useState('')
    const[image3,setImage3]=useState('')
    const[image4,setImage4]=useState('')
    const[size,setSize]=useState('')
    
    const fetchProduct=async()=>{
        product.map((item)=>{
        if(item._id===productId){
            setProductData(item)
            console.log(product)
            setImage(item.image1)
            setImage1(item.image1)
            setImage2(item.image2)
            setImage3(item.image3)
            setImage4(item.image4)
            console.log(item.sizes)
            return null
        }
        })
    }
    

    useEffect(()=>{
        fetchProduct()
    },[productId,product])
return productData ? (
  <div>
   <div className='w-full min-h-screen bg-gradient-to-r from-[#141414]
to-[#0c2025] flex flex-col lg:flex-row items-center lg:items-start
justify-center gap-5 py-20 px-4 lg:px-10'>
         {/* Product Data */}
         <div className='w-full lg:w-1/2 flex flex-col-reverse lg:flex-row
items-center justify-center gap-6'>

<div className='w-full lg:w-[20%]
flex lg:flex-col flex-row
justify-center items-center gap-4 flex-wrap'>
        <div className='w-[65px] h-[75px] md:w-[90px] md:h-[100px]
bg-slate-300 border rounded-md overflow-hidden'>
            <img src={image1} alt="" className='w-[100%] h-[100%] cursor-pointer rounded-md' onClick={
                ()=>setImage(image1)
            } />
         </div>
 
 
        <div className='md:w-[100px] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] rounded-md 
         '>
            <img src={image2} alt="" className='w-[100%] h-[100%] cursor-pointer rounded-md'onClick={
                ()=>setImage(image2)
            } />
         </div>

         
        <div className='md:w-[100px] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] rounded-md 
         '>
            <img src={image3} alt="" className='w-[100%] h-[100%] cursor-pointer rounded-md' onClick={
                ()=>setImage(image3)
            } />
         </div>

         
        <div className='md:w-[100px] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] rounded-md 
         '>
            <img src={image4} alt="" className='w-[100%] h-[100%] cursor-pointer rounded-md' onClick={
                ()=>setImage(image4)
            } />

         </div>
 
 </div>
 <div className='w-full lg:w-[65%] max-w-[450px]
border border-[#80808049] rounded-md overflow-hidden'>
     <img
  src={image}
 alt=""
 className='w-full h-[300px] md:h-[450px] lg:h-[500px]
 object-cover rounded-md'
/>
</div>

</div>
<div className='w-full lg:w-1/2
flex flex-col items-start justify-start
gap-4 pb-16 px-4 lg:px-0'>
<h1 className='text-[40px] font-semibold text-[aliceblue] '>{productData.name.toUpperCase()}</h1>
<div className='flex items-center gap-1'>
    <RiStarSFill className='text-[20px] fill-[#FFD700]'/>
    <RiStarSFill className='text-[20px] fill-[#FFD700]'/>
    <RiStarSFill className='text-[20px] fill-[#FFD700]'/>
    <RiStarSFill className='text-[20px] fill-[#FFD700]'/>
    <MdOutlineStarHalf className='text-[20px] fill-[#FFD700]'/>
    <p className='text-[18px] font-semibold pl-[5px] text-white'>(124)</p>
</div>
<p className='text-[30px] font-semibold pl-[5px] text-white'>{currency}{productData.price}</p>
<p className='w-[80%] md:w-[60%] text-[20px] font-semibold pl-[5px] text-[white] '>{productData.description}this product is designed with premium materials to provide excellent comfort,
  durability, and style. 
</p>
<div className='flex flex-col gap-[5px]  '>
    <p className='pl-[5px]  text-[25px] font-semibold text-white  '>Select Size</p>
    <div className='flex gap-2'>{
        productData.sizes.map((item,index)=>(
            <button key={index} className={`border py-2 px-4 bg-slate-300  rounded-md ${item===size ? 'bg-black text-[#2f97f1] text-[20px]' 
                :''}`} onClick={()=>setSize(item)}>{item}</button>
        ))}</div>
        
        <button className='text-[16px] active:bg-slate-500 cursor-pointer bg-[#495b61c9] py-[10px] 
        px-[20px] text-white shadow-md shadow-black  rounded-2xl border-[1px] border-[#80808049]'
         onClick={()=>addtoCart(productData._id,size)}>Add To Cart</button>
</div>

<div className='w-[90%] h-[1px] bg-slate-700 '></div>
    <div className='w-[80%] text-[16px] text-white '>
        <p>100% Original Product.</p>
        <p>Cash on delivery available on this product</p>
        <p>East return and exchangepolicy within 7 days</p>
    </div>

 </div>

    </div>

    <div className='w-[100%] min-h-[50vh] bg-gradient-to-r from-[#141414]
     to-[#0c2025] flex items-start justify-start  flex-col overflow-x-hidden'>
        <div className='flex px-[20px] mt-3 lg:ml-[80px] ml-[0px] lg:mt-[0px] '>
            <p className='border px-5 py-3 text-sm text-white'>Description</p>
            <p className='border px-5 py-3 text-sm text-white'>Reviews(124)</p>
  </div>

  <div className='w-[80%] md:h-[150px] h-[220px] bg-[#3336397c] md:px-[30px] lg:ml-[100px] 
ml-[20px]'>
    <p className='w-[95%] h-[90%] flex items-center justify-center text-white'>
        Upgrade Your wardrobe with this stylish slim-fit cotton shirt, available now 
        on OneCart.Crafted from breathhable, high-quality farbic, it offers all day comfort and effertless style
        .easy to maintain and perfect to anysetting this shirt is a must-have essentials for those who value both
        fashion and function. 
    </p>
</div>
<RelatedProduct category={productData.category} subCategory={productData.subCategory}
currentProductID={productData._id}/>
         </div>
  </div>

) : (
  <div className="opacity-0"></div>
);
}

export default ProductDetails
