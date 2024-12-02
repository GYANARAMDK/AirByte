import React from 'react'
import { useNavigate } from 'react-router'
import { FaTimes } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';
export default function ContactUs() {
  const Navigate=useNavigate();

  const NumberVerifyHandle=()=>{
    alert('we shortly connet you')
    Navigate('/AirByte')
  }
  return (
    <div>
      <Header/>
      <div className='flex justify-center items-center relative top-2 gap-4'>
        <h1 className='text-2xl bg-blue-400 p-2 rounded'>AirByte</h1>
      </div>
      <div className='  flex relative top-5 left-[37vw] h-[72vh] w-[25vw]  rounded border border-black flex-col p-4 gap-6'>
      <button className='absolute top-2 right-2 ' onClick={()=>{Navigate('/AirByte')}}><FaTimes/></button>
        <h1 className='text-xl'>Contact Us </h1>

        <div className='flex flex-col gap-2'>
          <h2>Name</h2>
          <input type="text" placeholder='enter your name' className='rounded border-black border w-[20vw] h-8' />
        </div>

        <div className='flex flex-col gap-2'>
          <h2>Phone No.</h2>
          <input type="text" placeholder='enter your phone no.' className='rounded border-black border w-[20vw] h-8' />
        </div>

        <div className='flex flex-col gap-2'>
          <h2>Gmail</h2>
          <input type="text" placeholder='Enter your Email ' className='rounded border-black border w-[20vw] h-8' />

        </div>
       
        <button className='bg-blue-400 rounded h-10'onClick={NumberVerifyHandle}>
         submit
        </button>
      </div>
     <Footer/>
    </div>
  )
}
