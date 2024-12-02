import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'
import { SetProducts } from '../Redux/ProductSlice'
import { useLocation, useNavigate } from 'react-router'

export default function Products() {
  const Dispatch = useDispatch()
  const token = useSelector((state) => state.User.AuthToken);
  const Navigate = useNavigate();
  const Product = useSelector((state) => state.Product)
  const [FilterCriteria, setFilterCriteria] = useState('All');
  const Location = useLocation();
  const SearchParams = new URLSearchParams(Location.search);
  const keyword = SearchParams.get('search')


  useEffect(() => {
    async function fetchproduct(params) {
      if (keyword) {
             try {
               const response=await axios.get('https://airbytebackend.onrender.com/products/search',
                {
                  params:{
                    keyword,
                  }
                })
                console.log(response.data);
                if (response.status === 200) {

                  Dispatch(SetProducts({
                    products: response.data
                  }))
                }
                if(!Product.products || Product.products.length === 0){
                    alert("no product found")
                }
             } catch (error) {
               console.log(error);
               if(error.response) console.log(error.response.data.message)
             }
            
          
         console.log(keyword);
       }
      else {
        const response = await axios.get('https://airbytebackend.onrender.com/products/')
        if (response.status === 200) {

          Dispatch(SetProducts({
            products: response.data.product
          }))
        }

      }
    }

    fetchproduct();
  }, [keyword])
  const filterproducts = useMemo(() => {
    if (!Product.products) return [];
    if (FilterCriteria === "All") {
      return [...Product.products]
    }
    if (FilterCriteria === 'prize') {
      return [...Product.products].sort((a, b) => a.price - b.price);
    }
    return Product.products;
  }, [FilterCriteria, Product.products])
  const HandleFilterChange = (e) => {
    setFilterCriteria(e.target.value)
  }





  const HandleAddToCart = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("please login in")
      Navigate('/login', { state: { from: '/Products' } },)
    } else {
      console.log(token)
    }
    const productId = e.currentTarget.getAttribute("data-id")
    const price = e.currentTarget.getAttribute('data-price')
    const quantity = 1
    try {
      const response = await axios.post(
        'https://airbytebackend.onrender.com/user/cart/add',
        { productId, quantity, price },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        console.log("product added to cart successfully");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      if (error.response) console.log(error.response.data.message);
    }
  }


  return (
    <div>
      <Header />

      <div className='flex'>
        <div className='w-[20vw] h-[60vh] p-4  border'>
          <h2 className='font-bold'>Filter</h2>
          <div className='mt-4'>

            <label htmlFor="category">Category:</label>
            <select id="category" className='border p-2 w-full' onChange={HandleFilterChange}>
              <option value="All">All</option>
              <option value="prize">prize</option>

            </select>
          </div>
        </div>
        <div className="w-3/4 p-4 overflow-y-auto h-[80vh]">
          <h2 className="text-2xl font-semibold mb-4">Products</h2>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filterproducts.map((product) => (
              <div key={product._id} className="border rounded-lg p-4">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold">{product.brand}</h3>
                <p className="text-gray-600">{product.name}</p>

                <div className='flex justify-between'>
                  <p className="text-gray-500 line-through">{product.price}</p>
                  <p className='text-lg font-bold '>no Offer</p>
                </div>

                <p className="text-lg font-bold">{`$${product.price}`}</p>

                <button className="mt-4 bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500"
                  data-id={product._id}
                  data-price={product.price}
                  onClick={(e) => HandleAddToCart(e)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
