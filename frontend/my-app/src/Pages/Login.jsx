
import React, { useContext, useState } from 'react'
import Logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import Google from "../assets/google.png"
import { IoEyeOutline } from "react-icons/io5"
import { FaRegEyeSlash } from "react-icons/fa"
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from "react-toastify"

import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../utils/firebase'
import { userDataContext } from '../context/UserContext'

import { useForm } from "react-hook-form"

function Login() {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const naviget = useNavigate()

  const { serverUrl } = useContext(authDataContext)
  const { getCurrUser } = useContext(userDataContext)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  // Normal Login
  const handleLogin = async (data) => {
    setLoading(true)

    try {
      const result = await axios.post(
        serverUrl + "/api/auth/login",
        {
          email: data.email,
          password: data.password
        },
        { withCredentials: true }
      )

      console.log(result)

      await getCurrUser()

      toast.success("User Login Successfully")
      naviget("/")

    } catch (error) {
      console.log(error)

      toast.error(
        error.response?.data?.message ||
        "Invalid email or password"
      )

    } finally {
      setLoading(false)
    }
  }

  // Google Login
  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider)

      const user = response.user

      const name = user.displayName
      const email = user.email

      const result = await axios.post(
        serverUrl + "/api/auth/googlelogin",
        {
          name,
          email
        },
        { withCredentials: true }
      )

      console.log(result)

      await getCurrUser()

      toast.success("Google Login Successfully")
      naviget("/")

    } catch (error) {
      console.log(error)

      toast.error(
        error.response?.data?.message ||
        "Google Login Failed"
      )
    }
  }

  return (

    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">

      <div
        className='w-[100vw] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer'
        onClick={() => naviget("/")}
      >
        <img className='w-[40px]' src={Logo} alt="oneCart Logo" />

        <h1 className='text-[22px] font-sans'>
          oneCart
        </h1>
      </div>

      <div className='w-[100%] h-[100px] flex items-center justify-center flex-col'>

        <span className='text-[25px] font-semibold'>
          Login
        </span>

        <span>
          Welcome to oneCart, Place your order
        </span>

      </div>

      {/* Login Form */}

      <div className="max-w-[600px] w-[90%] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex flex-col items-center py-6">

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]"
        >

          {/* Google Login */}

          <div
            className='mt-6 w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer'
            onClick={googleLogin}
          >
            <img
              src={Google}
              alt="Google"
              className="w-[20px]"
            />

            <span>
              Login with Google
            </span>
          </div>

          <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]'>

            <div className='w-[40%] h-[1px] bg-[#96969635]'></div>

            OR

            <div className='w-[40%] h-[1px] bg-[#96969635]'></div>

          </div>

          {/* Inputs */}

          <div className="w-[90%] flex flex-col gap-[10px] relative">

            {/* Email */}

            <input
              type="email"
              className="w-full h-[55px] border-2 border-[#96969635] shadow-lg backdrop-blur-sm bg-transparent placeholder:text-white/70 px-[20px] font-semibold"
              placeholder="Email"

              {...register("email", {
                required: "Email is required",

                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email"
                }
              })}
            />

            {errors.email && (
              <p className="text-red-400 text-sm">
                {errors.email.message}
              </p>
            )}

            {/* Password */}

            <div className="relative w-full">

              <input
                type={show ? "text" : "password"}

                className="w-full h-[55px] border-2 border-[#96969635] shadow-lg backdrop-blur-sm bg-transparent placeholder:text-white/70 px-[20px] font-semibold pr-[50px]"

                placeholder="Password"

                {...register("password", {
                  required: "Password is required",

                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
              />

              {!show ? (
                <IoEyeOutline
                  className="w-[20px] h-[20px] cursor-pointer absolute right-[15px] top-[50%] -translate-y-[50%]"
                  onClick={() => setShow(prev => !prev)}
                />
              ) : (
                <FaRegEyeSlash
                  className="w-[20px] h-[20px] cursor-pointer absolute right-[15px] top-[50%] -translate-y-[50%]"
                  onClick={() => setShow(prev => !prev)}
                />
              )}

            </div>

            {errors.password && (
              <p className="text-red-400 text-sm">
                {errors.password.message}
              </p>
            )}

            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}

              className="w-[100%] h-[55px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold disabled:opacity-70"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Login"
              )}
            </button>

            {/* Signup */}

            <p className='flex gap-[10px] flex-wrap'>

              You have no account?

              <span
                className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer'

                onClick={() => naviget("/signup")}
              >
                Create New Account
              </span>

            </p>

          </div>

        </form>

      </div>

    </div>
  )
}

export default Login