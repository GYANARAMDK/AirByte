
import { FaSearch } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { MdShoppingCart } from 'react-icons/md';
import { useNavigate } from 'react-router';

import '../App.css'
import { useState } from 'react';
export default function Header() {
    const Navigate = useNavigate();
    const [inputsearch,setinputsearch]=useState();
    const SearchHandle=()=>{
         if(!inputsearch || !inputsearch.trim())
            alert("please enter search")
         else 
         Navigate(`/products/?search=${inputsearch.trim()}`);
         
    }
    return (
        <div className=' flex justify-around items-center bg-white  text-black  text-xl w-full h-12 border'>

            <div className=' flex items-center justify-between  gap-12'>
                <img src='/logo.png' alt=" company logo" />
                <button onClick={() => Navigate('/AirByte')} className='  hover:bg-gray-300 rounded px-2'> AirByte</button>
                <button onClick={() => Navigate('/ContactUs')} className='  hover:bg-gray-300 rounded px-2'>Contact Us </button>
                {/* <button onClick={() => Navigate('/AboutUs')}>About Us </button> */}
                <button onClick={() => Navigate('/Products')} className='  hover:bg-gray-300 rounded px-2'>Products</button>
                <button onClick={() => Navigate('/MyOrders')} className='  hover:bg-gray-300 rounded px-2'>MyOrders</button>
            </div>
            

            <div className=' flex  items-center justify-evenly  '>
                <div className='  flex items-center border-2 rounded  '>
                    <input type="text" placeholder='search products' className='text-black '
                    value={inputsearch}  
                    onChange={(e)=>{setinputsearch(e.target.value)}}/>
                    <button className='px-1'
                    onClick={SearchHandle}>
                        <FaSearch />
                    </button>
                </div>
                <button onClick={() => Navigate('/Profile')} className='px-1'>
                    <FaUser className='w-8 h-8' />
                </button>
                <button onClick={() => Navigate('/Cart')} >
                    <MdShoppingCart className='w-9 h-9' />
                </button>
            </div>
        </div>
    )
}
