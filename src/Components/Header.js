
import { FaSearch } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { MdShoppingCart } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { FaBars } from "react-icons/fa";
import '../App.css'
import { useState } from 'react';
export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const Navigate = useNavigate();
    const [inputsearch, setinputsearch] = useState();
    const SearchHandle = () => {
        if (!inputsearch || !inputsearch.trim())
            alert("please enter search")
        else
            Navigate(`/AirByte/?search=${inputsearch.trim()}`);

    }
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="flex justify-between items-center bg-white text-black text-xl w-full h-16 border px-4 lg:px-8">

            <div className=' flex items-center gap-4'>
                <img src='/logo.png' alt=" company logo" className='hidden  lg:block  h-10' />
                <button
                    className=" block md:hidden text-2xl"
                    onClick={toggleMenu}
                >
                    <FaBars />
                </button>


                <div className={`${menuOpen ? 'block' : 'hidden'
                    } absolute top-16 left-4 bg-white border rounded shadow-md p-4 md:static md:flex md:gap-8 md:p-0 md:shadow-none md:border-none lg:flex lg:gap-8`}
                >
                    <button onClick={() => Navigate('/AirByte')} className='block md:inline hover:bg-gray-300 rounded px-2'> AirByte</button>
                    <button onClick={() => Navigate('/ContactUs')} className='block md:inline hover:bg-gray-300 rounded px-2'>ContactUs </button>
                    {/* <button onClick={() => Navigate('/AboutUs')}>About Us </button> */}
                    <button onClick={() => Navigate('/Products')} className='  block md:inline hover:bg-gray-300 rounded px-2'> New</button>
                    <button onClick={() => Navigate('/MyOrders')} className='  block md:inline hover:bg-gray-300 rounded px-2'>MyOrders</button>
                </div>
            </div>


            <div className=' flex items-center gap-4  '>
                <div className=' flex items-center border-2 rounded overflow-hidden  '>
                    <input type="text" placeholder='search products' className='text-black  px-2 py-1 w-full'
                        value={inputsearch}
                        onChange={(e) => { setinputsearch(e.target.value) }} />
                    <button className='px-2'
                        onClick={SearchHandle}>
                        <FaSearch />
                    </button>
                </div>
                <button onClick={() => Navigate('/Profile')} className='px-1'>
                    <FaUser className='w-6 h-6 lg:w-8 lg:h-8' />
                </button>
                <button onClick={() => Navigate('/Cart')} className='px-1'>
                    <MdShoppingCart className='w-6 h-6 lg:w-8 lg:h-8' />
                </button>
            </div>
        </div>
    )
}
