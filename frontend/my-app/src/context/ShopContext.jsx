import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'
import { userDataContext } from './UserContext'

export const shopDataContext=createContext()
function ShopContext({children}) {
    let {serverUrl}=useContext(authDataContext)
    let{userData}=useContext(userDataContext)
    let[product,setProduct]=useState([])
    let[search,setSearch]=useState('')
    let[showSearch,setShowSearch]=useState(false)
    let[cartItem,setCartItem]=useState({})
    let currency="₹"
    let delivery_fee=40
    const getProducts=async(req,res)=>{
let result=await axios.get(serverUrl+'/api/product/list')
console.log(result.data)
setProduct(result.data)}

//add to cart functionality
const addtoCart=async(itemId,size)=>{
   if(!size){
      console.log('select product size')
      return
   }
   let cartData=structuredClone(cartItem)
   if(cartData[itemId]){
      if(cartData[itemId][size]){
         cartData[itemId][size]+=1
}else{
   cartData[itemId][size]=1
}
   }else{
      cartData[itemId]={}
      cartData[itemId][size]=1
   }


   setCartItem(cartData)
   console.log(cartData)
   if(userData){
try {
   await axios.post(serverUrl+'/api/cart/add',{itemId,size},{withCredentials:true})


} catch (error) {
   console.log(error)
  }    
   }else{
   console.log('add error')
   }
}
//fetch user cart
const getCartData=async()=>{
   try {
      const result=await axios.post(serverUrl+'/api/cart/get',{},{withCredentials:true})
      setCartItem(result.data)

   } catch (error) {
      console.log(error)
      GiToaster.error(error.message)
   }
}

// update quantity
const updatequantity = async (itemId, size, quantity) => {
   let cartData = structuredClone(cartItem);
   cartData[itemId][size] = quantity;

   setCartItem(cartData);   

   if (userData) {
      try {
         await axios.post(
            serverUrl + "/api/cart/update",
            { itemId, size, quantity },
            { withCredentials: true }
         );
      } catch (error) {
         console.log(error);
      }
   }
};

const getCartCount=()=>{
   let totalCount=0
   for(const items in cartItem){
      for(const item in cartItem[items]){
         try{
            
if(cartItem[items][item] > 0){
   totalCount+=cartItem[items][item]
}
            }
            catch(err){

            }
         }
      }
      return totalCount
   }

// total amount of all carts
const getCartAmount=()=>{
let totalAmount=0   
for(const items in cartItem){
   let itemInfo=product.find((product)=>product._id===items)
   for(const item in cartItem[items]){
      try {
         if(cartItem[items][item]>0){
            totalAmount+=itemInfo.price * cartItem[items][item]
         }
      } catch (error) {
       console.log(error)  
      }
   }

}
return totalAmount
}
 useEffect(()=>{ 
    getProducts()
 },[])



 
 let value={
    product,currency,getProducts,delivery_fee,search,setSearch,
    showSearch,setShowSearch,addtoCart,setCartItem,getCartCount,cartItem,updatequantity,getCartAmount
 }


  return (
    <div>
      
            <shopDataContext.Provider value={value}>
            {children}
            </shopDataContext.Provider>
    </div>
  )
}

export default ShopContext
