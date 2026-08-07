import React, { useContext, useState } from 'react'
import logo from "../assets/logo.png"
import { IoSearchCircleOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { userDataContext } from '../context/UserContext';
import { IoSearchCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { shopDataContext } from '../context/ShopContext';
function Nav() {
  let { getCurrUser, userData,setUserData } = useContext(userDataContext)
  let {
    search,
    setSearch,
    showSearch,
    setShowSearch,
    getCartCount
  } = useContext(shopDataContext);
  let { serverUrl } = useContext(authDataContext)

  let [showProfile, setShowProfile] = useState(false)
  let navigate = useNavigate()

  // logout user
  let handleLogout = async () => {
    try {
      let result = await axios.get(serverUrl + '/api/auth/logout', { withCredentials: true })
      console.log(result.data)
    setUserData(null)
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='w-[100vw] h-[70px] bg-[#ecfafaec] z-10  fixed top-0   flex items-center justify-between px-[30px] shadow-md shadow-bklack'>

      <div className='w-[20%] lg:w-[30%] flex items-center  justify-start gap-[10px]'>
        <img src={logo} alt="" className='w-[30px]' />
        <h1 className='text-[25px] text-black font-sans'>OneCart</h1>
      </div>
      <div className='w-[45%] lg:w-[40%] hidden md:flex '>
        <ul className='flex items-center justify-center gap-[19px] text-white '>
          <li className='text-[15px] hover-bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl' onClick={() => navigate('/')}>HOME</li>
          <li className='text-[15px] hover-bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl' onClick={() => navigate('/collection')} >COLLECTIONS</li>
          <li className='text-[15px] hover-bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl' onClick={() => navigate('/about')}>ABOUT</li>
          <li className='text-[15px] hover-bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl' onClick={() => navigate('/contact')}>CONTACT</li>
        </ul>
      </div>

      <div className='w-[30%] flex items-center justify-end gap-[20px] '>
        {!showSearch && <IoSearchCircleOutline className='w-[30px] h-[35px] text-[#000000] cursor-pointer ' onClick={() => { setShowSearch(prev => !prev); navigate('/collection') }} />
        }{showSearch && <IoSearchCircle className='w-[30px] h-[35px] text-[#000000] cursor-pointer ' onClick={() => setShowSearch(prev => !prev)} />
        }
        {!userData && <FaUserCircle className='w-[30px] h-[35px] text-black cursor-pointer ' onClick={() => setShowProfile(prev => !prev)} />}
        {userData && <div className=' w-[30px] h-[30px] bg-[#080808] text-white rounded-full flex items-center justify-center cursor-pointer' onClick={() => setShowProfile(prev => !prev)}>{userData?.name.slice(0, 1)}</div>}
        <div className='relative hidden md:block'>
          <BsCart3 className='w-[30px] h-[35px] text-black cursor-pointer'  onClick={()=>navigate('/cart')}/>

          <p className='absolute -top-2 -right-2 w-[18px] h-[18px] flex items-center justify-center bg-black text-white font-semibold rounded-full text-[9px]'>
            {getCartCount()}
          </p>
        </div>
      </div>
      {showSearch && <div className='w-[full] h-[80px] bg-[#d8f6f9dd] absolute top-[100%] left-0 right-0 flex items-center justify-center'>
        <input type="text" className='lg:w-[50%] w-[80%] h-[60%] bg-[#233533] rounded-[30px] px-[50px] placeholder:text-white text-white text-18px ' placeholder='Searh Here' onChange={(e) => setSearch(e.target.value)} value={search} />
      </div>}

      {showProfile && <div className='absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%] border-[1px] border-[#aaa9a9] rounded-[10px] z-10 '>


        <ul className='w-[100%] h-[100%] flex items-start justify-around flex-col text-[17px] py-[10px] text-[white] '>
          {!userData && <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={() => { navigate("/login"); setShowProfile(false) }}>Login</li>}
          {userData && <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer ' onClick={() => { handleLogout(); setShowProfile(false) }}>LogOut</li>}
          <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={() => navigate('/order')}>Order</li>
          <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={() => navigate('/about')}>About</li>
        </ul>
      </div>}

      <div className="w-[100vw] h-[90px] flex items-center justify-around fixed text-[15px] bottom-0 left-0  bg-[#191818] md:hidden">
        <button className='  text-[white] flex items-center justify-center flex-col gap-[2px] ' onClick={() => navigate('/')}><IoMdHome className='w-[30px] h-[30px] text-[white] md:hidden' /></button>
        <button className='  text-[white] flex items-center justify-center flex-col gap-[2px] ' onClick={() => navigate('/collection')}><HiOutlineCollection className='w-[30px] h-[30px] text-[white] md:hidden ' /></button>
        <button className='  text-[white] flex items-center justify-center flex-col gap-[2px] ' onClick={() => navigate('/contact')}><MdContacts className='w-[30px] h-[30px] text-[white] md:hidden' /></button>

        <button
          className='text-[white] flex items-center justify-center flex-col gap-[2px]'
          
        >
          <div className="relative block lg:hidden">
            <BsCart3 className="w-[30px] h-[30px] text-white" onClick={()=>navigate('/cart')}/>

            <p className="absolute -top-2 -right-2 w-[18px] h-[18px] flex items-center justify-center bg-white text-black font-semibold rounded-full text-[9px]">
              {getCartCount()}
            </p>
          </div>
        </button>
      </div>
    </div>
  )
}

export default Nav
