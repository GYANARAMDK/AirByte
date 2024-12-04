import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaBell } from 'react-icons/fa';
export default function Footer() {
    return (
        <div className='flex flex-col w-full py-4 bg-white text-black px-4 lg:px-8 text-xl border'>
            <div className='flex flex-col lg:flex-row   justify-between lg:items-start items-center gap-4  ' >
                <div className='flex flex-col sm:flex-row gap-2 sm:gap-8 items-center'>
                    <button>
                        Privacy & Policy
                    </button>
                    <button>
                        Terms & Condition
                    </button>
                    <button>
                        About Us
                    </button>
                    <button>
                        Career
                    </button>
                </div>
                <div className=' flex gap-4 lg:gap-6'>
                    <a href="https://www.linkedin.com/in/gyanaram-dhaka-1287052b8/">
                        <FaLinkedin className="text-blue-700 w-8 h-8" />
                    </a>
                    <a href="https://www.instagram.com/dgyanaram/">
                        <FaInstagram className="text-pink-600 w-8 h-8" />
                    </a>
                    <a href="https://x.com/gyanaramdh2">
                        <FaTwitter className="text-blue-400 w-8 h-8" />
                    </a>
                    <a href="https://www.facebook.com/gyanaram.dhaka.7">
                        <FaFacebook className="text-blue-600 w-8 h-8" />
                    </a>
                </div>
            </div>
            <hr class="border-black border-1 w-full my-2" /> 
            <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                <div className=" text-sm text-center md:text-left ">
                    <p class="text-sm">&copy; 2024 AirByte. All rights reserved.</p>
                </div>
                <div className='flex flex-col items-start'>
                    <h1 className='font-bold'>Subscribe us</h1>
                    <div className='flex items-center border rounded overflow-hidden mt-2'>

                        <input type="text" placeholder='enter your eamil ' className='px-2 py-1 w-48 text-black' />
                        <FaBell className='text-yellow-400 w-6 h-6 mx-2' />
                    </div>
                </div>

            </div>
        </div>
    )
}
