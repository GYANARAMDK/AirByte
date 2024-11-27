import React from 'react'
import { useNavigate } from 'react-router'
import { FaTimes } from 'react-icons/fa';
export default function Login() {
  const Navigate=useNavigate()
  return (
   <div>
     <div className='flex justify-center items-center relative top-2 gap-4'>
        <h1 className='text-2xl bg-yellow-400 p-2 rounded'>AirByte</h1>
      </div>
      <div className='  flex relative top-5 left-[38vw] h-[62vh] w-[25vw]  rounded border border-black flex-col p-4 gap-6'>
        <button className='absolute top-2 right-2 ' onClick={()=>{Navigate('/AirByte')}}><FaTimes/></button>
        <h1 className='text-xl'>Login </h1>

        

        <div className='flex flex-col gap-2'>
          <h2>Phone No.</h2>
          <input type="text" placeholder='enter your phone no.' className='rounded border-black border w-[20vw] h-8' />
        </div>

        <div className='flex flex-col gap-2'>
          <h2>Password</h2>
          <input type="text" placeholder='enter your password ' className='rounded border-black border w-[20vw] h-8' />

        </div>
        
        <button className='bg-yellow-400 rounded h-10' onClick={()=>{Navigate('/Profile') }}>
          login
        </button>
      </div>
      <span className='flex justify-center items-center relative top-6 gap-1 '>

        Don't have an account?
        <button className='underline ' onClick={()=>Navigate('/SignUp')}>sign up</button>
      </span>
   </div>
  )
}
