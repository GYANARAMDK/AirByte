// import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router'
import { FaTimes } from 'react-icons/fa';

export default function SignUp() {
  const Navigate=useNavigate();
  const Dispatch=useDispatch();
  const User=useSelector((State)=>State.User);
  
  const NumberVerifyHandle=()=>{
    alert('account created successfully')
    Navigate('/Login')
  }

  return (
    <div>
      <div className='flex justify-center items-center relative top-2 gap-4'>
        <h1 className='text-2xl bg-yellow-400 p-2 rounded'>AirByte</h1>
      </div>
      <div className='  flex relative top-5 left-[35vw] h-[82vh] w-[30vw]  rounded border border-black flex-col p-4 gap-4'>
      <button className='absolute top-2 right-2 ' onClick={()=>{Navigate('/AirByte')}}><FaTimes/></button>
        <h1 className='text-xl'>Create Account </h1>

        <div className='flex flex-col gap-2'>
          <h2>Name</h2>
          <input type="text" placeholder='enter your name' className='rounded border-black border w-[20vw] h-8' value={User.UserInfo.name}/>
        </div>

        <div className='flex flex-col gap-2'>
          <h2>Phone No.</h2>
          <input type="text" placeholder='enter your phone no.' className='rounded border-black border w-[20vw] h-8' value={User.UserInfo.phone} />
        </div>

        <div className='flex flex-col gap-2'>
          <h2>Password</h2>
          <input type="text" placeholder='Atleast 6 charactor ' className='rounded border-black border w-[20vw] h-8' value={User.UserInfo.password} />

        </div>
        <h1>
          To verify your number, we will send you a text message with a temporary code. Message and data rates may apply
        </h1>
        <button className='bg-yellow-400 rounded h-10'onClick={NumberVerifyHandle}>
          Verify your Number
        </button>
      </div>
      <span className='flex justify-center items-center relative top-6 gap-1 '>

        Already have an account?
        <button className='underline ' onClick={()=>Navigate('/Login')}>login</button>
      </span>
    </div>
  )
}
