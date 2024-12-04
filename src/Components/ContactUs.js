import React from 'react'
import { useNavigate } from 'react-router'
import { FaTimes } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';
export default function ContactUs() {
  const Navigate = useNavigate();

  const NumberVerifyHandle = () => {
    alert('we shortly connet you')
    Navigate('/AirByte')
  }
  return (
    <div>
      <Header />

      
      <div className="flex-1 flex justify-center items-center">
        <div className='  relative bg-white shadow-lg rounded-lg p-6 w-[90%] sm:w-[70%] md:w-[40%] lg:w-[30%] border border-black'>
          <button className='absolute top-3 right-3 text-xl text-gray-600 hover:text-black ' onClick={() => { Navigate('/AirByte') }}><FaTimes /></button>
          <h1 className="text-xl mb-6 text-center font-semibold">Contact Us</h1>
          < div className="flex flex-col gap-4">
            <div >
              <label className='block mb-1 font-medium'>Name</label>
              <input type="text" placeholder='enter your name' className='rounded border border-black w-full h-10 px-2' />
            </div>

            <div >
              <label className='block mb-1 font-medium'>Phone No.</label>
              <input type="text" placeholder='enter your phone no.' className='rounded border border-black w-full h-10 px-2' />
            </div>

            <div>
              <label className='block mb-1 font-medium'>Gmail</label>
              <input type="text" placeholder='Enter your Email ' className='rounded border border-black w-full h-10 px-2' />

            </div>

            <button className='bg-blue-400 text-white mt-4 hover:bg-blue-500 rounded h-10' onClick={NumberVerifyHandle}>
              submit
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
