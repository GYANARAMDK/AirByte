import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaBell } from 'react-icons/fa';
export default function Footer() {
    return (
        <div className='flex-col w-[100vw] py-4 bg-white text-black px-[84px] text-xl border'>
            <div className='flex justify-between items-center   ' >
                <div className='flex items-center justify-between gap-10 '>
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
                <div className=' flex justify-evenly items-center gap-10'>
                    <a href="https://www.linkedin.com/in/gyanaram-dhaka-1287052b8/">
                        <FaLinkedin className="text-blue-700 w-10 h-10" />
                    </a>
                    <a href=" loda.com">
                        <FaInstagram className="text-pink-600 w-10 h-10" />
                    </a>
                    <a href="x.com">
                        <FaTwitter className="text-blue-400 w-10 h-10" />
                    </a>
                    <a href="loda.com">
                        <FaFacebook className="text-blue-600 w-10 h-10" />
                    </a>
                </div>
            </div>
            <hr class="border-black border-1 w-full my-2" />
            <div className='flex justify-between items-center '>
                <div className="  text-center ">
                    <p class="text-sm">&copy; 2024 YourCompanyName. All rights reserved.</p>
                </div>
                <div>
                    <h1 className='font-bold'>Subscribe us</h1>
                    <div className='flex justify-between items-center  border rounded py-2'>

                        <input type="text" placeholder='enter your eamil ' className='mx-1 rounded text-black' />
                        <FaBell className=' text-yellow-400 w-6 h-6 mx-1' />
                    </div>
                </div>

            </div>
        </div>
    )
}
