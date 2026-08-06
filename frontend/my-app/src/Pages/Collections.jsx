import React, { useContext, useEffect, useState } from 'react'
import { FaChevronRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import Title from '../components/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../components/Card';

function Collections() {
  let[showFilter,setShowFilter]=useState(false)
  
  let{search,setSearch,product,showSearch,setShowSearch}=useContext(shopDataContext)
  let[filterProduct,setFilterProduct]=useState([])
  let[category,setCategory]=useState([])
  let[subCategory,setSubCategory]=useState([])
  let[sortType,setsortType]=useState("relavent")
  const toggleCategory=(e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev=>prev.filter(item=>item !== e.target.value))
    }else{
      setCategory(prev=>[...prev,e.target.value])
    }
  }

  const toggleSubCategory=(e)=>{
    console.log(subCategory)
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev=>prev.filter(item=>item !== e.target.value))
    }else{
      setSubCategory(prev=>[...prev,e.target.value])
    }
  }
  
  const sortProduct=()=>{
    let fbCopy=filterProduct.slice()

    switch(sortType){
      case "low-high":setFilterProduct(fbCopy.sort((a,b)=>(a.price-b.price)))
      break;

       case "high-low":setFilterProduct(fbCopy.sort((a,b)=>(b.price-a.price)))
      break;

      default:applyFilter()
    }
    }

    
  useEffect(()=>{
sortProduct()
  },[sortType])

  

  const applyFilter=()=>{
    let productCopy=product.slice()
    if(showSearch && search){
      productCopy=productCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(category.length>0){
      productCopy=productCopy.filter(item=>category.includes(item.category))
    }

    if(subCategory.length>0){
      productCopy=productCopy.filter(item=>subCategory.includes(item.subCategory))
    }
    setFilterProduct(productCopy)
  }

  useEffect(()=>{
 setFilterProduct(product)
  },[product])

  useEffect(()=>{
applyFilter()
  },[category,subCategory,product,search,showSearch])
  return (
    <div
  className="w-screen min-h-screen bg-gradient-to-b from-[#141414] to-[#0c2025] flex flex-col
   md:flex-row items-start justify-start pt-[70px] overflow-x-hidden z-[2]"
>
<div className={`md:w-[30vw] lg:w-[20vw] w-[100vw] md:min-h-[100vh] ${showFilter ? "h-[45vh]":"h-[8vh]"} p-[20px] border-r-[1px] border-gray-400
text-[#aaf5fa] lg:fixed`}>
  <p className='text-[25px] font-semibold flex gap-[5px] items-center justify-start cursor-pointer ' onClick={()=>setShowFilter((prev)=>!prev)}>FILTERS
    {!showFilter && <FaChevronRight className='text-[18px] md:hidden'/>}
    {showFilter && <FaChevronDown className='text-[18px] md:hidden'/>}
  </p>


                    {/* categories */}
  <div className={`border-[2px] border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${showFilter ? "" :"hidden"}  md:block `}>
    <p className='text-[18px] text-[#f8fafa] '>CATEGORIES</p>
    <div className="w-[230px] h-[120px] flex flex-col items-start justify-center gap-3">
  <label className="flex items-center gap-2 text-[16px] font-light">
    <input type="checkbox" value="Men" onChange={toggleCategory} />
    Men
  </label>

  <label className="flex items-center gap-2 text-[16px] font-light">
    <input type="checkbox" value="Women"  onChange={toggleCategory}/>
    Women
  </label>

  <label className="flex items-center gap-2 text-[16px] font-light">
    <input type="checkbox" value="Kids" onChange={toggleCategory} />
    Kids
  </label>
</div>

                     


  </div>
       {/* subcategories */}
    <div className={`border-[2px] border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${showFilter ? "" :"hidden"}  md:block `}>
    <p className='text-[18px] text-[#f8fafa] '>SUBCATEGORIES</p>
    <div className="w-[230px] h-[120px] flex flex-col items-start justify-center gap-3">
  <label className="flex items-center gap-2 text-[16px] font-light">
    <input type="checkbox" value="TopWear" onChange={toggleSubCategory} />
    TopWear
  </label>

  <label className="flex items-center gap-2 text-[16px] font-light">
    <input type="checkbox" value="BottomWear" onChange={toggleSubCategory} />
    BottomWear
  </label>

  <label className="flex items-center gap-2 text-[16px] font-light">
    <input type="checkbox" value="WinterWear"  onChange={toggleSubCategory}/>
    WinterWear
  </label>
</div>
  </div>

</div>

<div className='lg:pl-[20%]  md:py-[10px] '>
<div
  className="w-[100vw]  md:w-[80vw] p-[10px]  flex flex-col lg:flex-row justify-between items-center lg:px-[50px] gap-4"
>
  <Title text1={"All"} text2={"COLLECTION"} />

  <select
    className="w-full md:w-[300px] lg:w-[250px] h-[50px] px-[10px] bg-slate-600 w-[60%] text-white rounded-lg border-2 hover:border-[#46d1f7] outline-none"
onChange={(e)=>setsortType(e.target.value)}  >
    <option value="relavent" className='w-[100%] h-[100%]'>Sort By: Relevant</option>
    <option value="low-high" className='w-[100%] h-[100%]'>Sort By: Low To High</option>
    <option value="high-low" className='w-[100%] h-[100%]'>Sort By: High To Low</option>
  </select>
</div>

<div className='lg:w-[80vw] md:-[60vw] w-[100vw] min-h-[70vh] flex items-center justify-center 
flex-wrap gap-[30px]'>
{
  filterProduct.map((item,index)=>(
    <Card key={index} id={item._id} price={item.price} image={item.image1} name={item.name}/>
  ))
}

</div>
</div>
    </div>
  )
}

export default Collections