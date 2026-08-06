import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function LatestCollection() {
    let {product}=useContext(shopDataContext)
    let[latestProduct,setLatestProduct]=useState([])
    useEffect(() => {
  if (product) {
    setLatestProduct(product.slice(0, 8));
  }
}, [product]);

  return (
    <div className=' w-[100%] min-h-screen text-center md:text-[50px] '>
      <Title text1={"LATEST"} text2={"COLLECTION"} />
      <p className='w-[100%] m-auto- text-[13px] md:text-[20px] px-[10px] text-blue-100'>
        Step Into Style  New Collection Dropping This Season!
      </p>
         <div className='w-[100%] h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]'>{
        
        latestProduct.map((item, index) => (
  <Card
    image={item.image1}
    name={item.name}
    id={item._id}
    key={index}
    price={item.price}
  />
))
        
            }</div>
   
    </div>
  )
}

export default LatestCollection
