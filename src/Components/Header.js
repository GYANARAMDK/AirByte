import React from 'react'
import { FaSearch } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { MdShoppingCart } from 'react-icons/md';
import { useNavigate } from 'react-router';

import '../App.css'
export default function Header() {
    const Navigate=useNavigate();
    return (
        <div className=' flex w-[100vw] h-[8vh] bg-black text-white px-[84px] justify-evenly items-center  text-xl'>
            <h1>loda</h1>
            <div className=' flex items-center justify-between w-1/5'>
                <img src='/logo.png' alt=" company logo" />
                <button onClick={()=>Navigate('/AirByte')}> AirByte</button>
            </div>
            <div className='w-1/2 flex justify-evenly items-center'>
                <button onClick={()=>Navigate('/ContactUs')}>Contact Us </button>
                <button onClick={()=>Navigate('/AboutUs')}>About Us </button>
                <button onClick={()=>Navigate('/Products')}>Product</button>
                <button onClick={()=>Navigate('/MyOrders')}>MyOrders</button>
            </div>
            <div className=' flex w-1/3 items-center justify-evenly '>
                <div className='  flex items-center border-2 rounded'>
                    <input type="text" placeholder='Search ' className='text-black' />
                    <button className='mx-2 '>
                        <FaSearch />
                    </button>
                </div>
                <div className='mx-2 '>
                    <button onClick={()=>Navigate('/Profile')}>
                    <FaUser className='w-10 h-10' /> 
                    </button>
                   
                </div>
                <div >
                    <button onClick={()=>Navigate('/Cart')}>
                    <MdShoppingCart className='w-10 h-10'  />
                    </button>
                   
                </div>
            </div>
        </div>
    )
}
