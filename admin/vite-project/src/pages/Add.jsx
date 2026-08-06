import React, { useContext, useState } from 'react'
import Nav from '../components/Nav'
import SideBar from '../components/SideBar'
import uploadImg from "../assets/upload.png";
import { AuthDataContext } from '../components/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function Add() {

  let [image1, setImage1] = useState(false)
  let [image2, setImage2] = useState(false)
  let [image3, setImage3] = useState(false)
  let [image4, setImage4] = useState(false)

  let [name, setName] = useState("")
  let [description, setDescription] = useState("")
  let [category, setCategory] = useState("Men")
  let [price, setPrice] = useState("")
  let [subcategory, setSubCategory] = useState("TopWear")
  let [bestSeller, setBestSeller] = useState(false)
  let [size, setSize] = useState([])

  let {serverUrl} = useContext(AuthDataContext)
const[loading,setLoading]=useState(false)

  //add product
  const handleAddProduct = async(e)=>{
    setLoading(true)
    e.preventDefault()

    try {

      let formData = new FormData()

      formData.append("name",name)
      formData.append("description",description)
      formData.append("category",category)
      formData.append("subCategory",subcategory)
      formData.append("price",price)
      formData.append("sizes",JSON.stringify(size))
      formData.append("bestseller",bestSeller)

      formData.append("image1",image1)
      formData.append("image2",image2)
      formData.append("image3",image3)
      formData.append("image4",image4)


      let result = await axios.post(
        serverUrl+"api/product/addproduct",
        formData,
        {
          withCredentials:true
        }
      )

      console.log(result.data)
      setLoading(false)
      toast.success(`your product successfully posted`)

      if(result.data.success){

        setName("")
        setDescription("")
        setBestSeller(false)

        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)

        setCategory("Men")
        setSubCategory("TopWear")
        setPrice("")
        setSize([])

      }

    } catch(error) {
toast.error("Add Product Failed")
      console.log(error)
    }
  }


  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-[#141414] to-[#0c2025] text-white overflow-x-hidden relative bottom-[5%]">

      <Nav />
      <SideBar />

      <div className="w-[80%] min-h-screen flex items-start justify-start absolute right-0">

        <form onSubmit={handleAddProduct} className="w-full py-[60px] px-[30px] md:px-[60px]">

          <div className="w-[400px] h-[50px] text-[25px] md:text-[40px] text-white mt-[10px]">
            Add Product Page
          </div>


          <div className="w-[80%] flex items-start justify-start flex-col mt-[20px] gap-[10px]">

            <p className="text-[20px] md:text-[25px] font-semibold">
              Upload Image
            </p>


            {/* image upload div */}

            <div className="w-full flex items-center justify-start mt-[10px] gap-4">

              <label 
                htmlFor="image1"
                className="w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]"
              >

                <img
                  src={!image1 ? uploadImg : URL.createObjectURL(image1)}
                  alt=""
                  className="w-[80%] h-[80%] rounded-lg shadow-2xl border-[2px]"
                />

                <input
                  type="file"
                  id="image1"
                  hidden
                  onChange={(e)=>setImage1(e.target.files[0])}
                  required
                />

              </label>


              <label 
                htmlFor="image2"
                className="w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]"
              >

                <img
                  src={!image2 ? uploadImg : URL.createObjectURL(image2)}
                  alt=""
                  className="w-[80%] h-[80%] rounded-lg shadow-2xl border-[2px]"
                />

                <input
                  type="file"
                  id="image2"
                  hidden
                  onChange={(e)=>setImage2(e.target.files[0])}
                  required
                />

              </label>

                            <label 
                htmlFor="image3"
                className="w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]"
              >

                <img
                  src={!image3 ? uploadImg : URL.createObjectURL(image3)}
                  alt=""
                  className="w-[80%] h-[80%] rounded-lg shadow-2xl border-[2px]"
                />

                <input
                  type="file"
                  id="image3"
                  hidden
                  onChange={(e)=>setImage3(e.target.files[0])}
                  required
                />

              </label>



              <label 
                htmlFor="image4"
                className="w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]"
              >

                <img
                  src={!image4 ? uploadImg : URL.createObjectURL(image4)}
                  alt=""
                  className="w-[80%] h-[80%] rounded-lg shadow-2xl border-[2px]"
                />

                <input
                  type="file"
                  id="image4"
                  hidden
                  onChange={(e)=>setImage4(e.target.files[0])}
                  required
                />

              </label>


            </div>

          </div>



          {/* Product Name */}

          <div className='w-[80%] min-h-[150px] flex items-start justify-center flex-col gap-[5px]'>

            <p className='p-[20px] md:text-[25px] font-semibold'>
              Product Name
            </p>

            <input 
              type="text" 
              placeholder='Type Here'
              value={name}
              onChange={(e)=>setName(e.target.value)}
              required
              className='w-[600px] max-w-[98%] h-[50px] rounded-lg border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2]' 
            />

          </div>



          {/* product description */}

          <div className='w-[80%] flex items-start justify-center flex-col gap-[5px]'>

            <p className='p-[20px] md:text-[25px] font-semibold'>
              Product Description
            </p>

            <textarea
              placeholder='Type Here'
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              required
              className='w-[600px] max-w-[98%] h-[100px] rounded-lg border-[2px] cursor-pointer bg-slate-600 px-[20px] py-[10px] placeholder:text-[#ffffffc2]'
            />

          </div>




          {/* category */}

          <div className='w-[80%] flex items-center gap-[10px] flex-wrap'>


            <div className='md:w-[30%] w-[100%] flex items-center sm:justify-center flex-col gap-[10px]'>

              <p className='text-[20px] md:text-[25px] font-semibold w-[100%]'>
                Product Category
              </p>


              <select 
                className='bg-slate-600 w-[60%] px-[8px] py-[7px] rounded-lg hover:border-[#46d1f7] border-[2px]'
                onChange={(e)=>setCategory(e.target.value)}
                value={category}
                required
              >

                <option value="Men">
                  Men
                </option>

                <option value="Women">
                  Women
                </option>

                <option value="Kids">
                  Kids
                </option>

              </select>

            </div>





            {/* sub category */}

            <div className='md:w-[30%] w-[100%] flex items-center sm:justify-center flex-col gap-[10px]'>

              <p className='text-[20px] md:text-[25px] font-semibold w-[100%]'>
                Sub-Category
              </p>


              <select 
                className='bg-slate-600 w-[60%] px-[8px] py-[7px] rounded-lg hover:border-[#46d1f7] border-[2px]'
                onChange={(e)=>setSubCategory(e.target.value)}
                value={subcategory}
                required
              >

                <option value="TopWear">
                  TopWear
                </option>

                <option value="BottomWear">
                  BottomWear
                </option>

                <option value="WinterWear">
                  WinterWear
                </option>

              </select>


            </div>




            {/* price */}

            <div className='w-[80%] min-h-[150px] flex items-start justify-center flex-col gap-[5px]'>

              <p className='p-[20px] md:text-[25px] font-semibold'>
                Product Price
              </p>


              <input 
                type="number"
                placeholder='₹ 500'
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                required
                className='w-[600px] max-w-[98%] h-[50px] rounded-lg border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2]'
              />

            </div>

                        {/* sizes */}

            <div className='w-[80%] h-[220px] md:h-[100px] flex items-start justify-center flex-col gap-[10px] py-[10px] md:py-[0px]'>


              <p className='text-[20px] md:text-[25px] font-semibold'>
                Product Size
              </p>


              <div className='flex items-center justify-start gap-[15px] flex-wrap'>


                <div 
                className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer ${size.includes("S")?"bg-green-400 text-black border-[#46d1f7]":""}`}
                onClick={()=>setSize((prev)=>prev.includes("S") ? prev.filter(item=>item!=="S") : [...prev,"S"])}
                >
                  S
                </div>



                <div 
                className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer ${size.includes("M")?"bg-green-400 text-black border-[#46d1f7]":""}`}
                onClick={()=>setSize((prev)=>prev.includes("M") ? prev.filter(item=>item!=="M") : [...prev,"M"])}
                >
                  M
                </div>




                <div 
                className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer ${size.includes("L")?"bg-green-400 text-black border-[#46d1f7]":""}`}
                onClick={()=>setSize((prev)=>prev.includes("L") ? prev.filter(item=>item!=="L") : [...prev,"L"])}
                >
                  L
                </div>





                <div 
                className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer ${size.includes("XL")?"bg-green-400 text-black border-[#46d1f7]":""}`}
                onClick={()=>setSize((prev)=>prev.includes("XL") ? prev.filter(item=>item!=="XL") : [...prev,"XL"])}
                >
                  XL
                </div>




                <div 
                className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer ${size.includes("XXL")?"bg-green-400 text-black border-[#46d1f7]":""}`}
                onClick={()=>setSize((prev)=>prev.includes("XXL") ? prev.filter(item=>item!=="XXL") : [...prev,"XXL"])}
                >
                  XXL
                </div>


              </div>

            </div>




          </div>




          {/* checkbox for best seller */}

          <div className='w-[80%] flex items-center justify-start gap-[10px] mt-[20px]'>


            <input 
            type="checkbox" 
            id='checkbox' 
            checked={bestSeller}
            onChange={(e)=>setBestSeller(e.target.checked)}
            className='w-[25px] h-[25px] cursor-pointer'
            />


            <label 
            htmlFor="checkbox" 
            className='text-[18px] md:text-[22px] font-semibold'
            >
              Add To BestSeller
            </label>


          </div>





          <button 
          type="submit"
          className='w-[140px] px-[20px] py-[20px] rounded-xl bg-[#65d8f7] flex items-center justify-center
           gap-[10px] mt-[30px] text-black active:bg-slate-700 active:text-white border-white active:border-[2px]'
          >

          {loading ?    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin "></div>:"Add Product"}

          </button>



        </form>


      </div>


    </div>
  )
}

export default Add