import React from 'react'
import Header from './Header'
import Footer from './Footer'
import drones from '../Drones'
export default function Products() {
  return (
    <div>
      <Header />
     
      <div className='flex'>
        <div className='w-[20vw] p-4 border-r'>
          <h2 className='font-bold'>Filter</h2>
          <div className='mt-4'>
           
            <label htmlFor="category">Category:</label>
            <select id="category" className='border p-2 w-full'>
              <option value="Prize">prize</option>
              <option value="Color">Color</option>
              <option value="BatteryLife">BatteryLife</option>
            </select>
          </div>
        </div>
        <div className="w-3/4 p-4 overflow-y-auto h-[80vh]">
        <h2 className="text-2xl font-semibold mb-4">Products</h2>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {drones.map((product) => (
            <div key={product.id} className="border rounded-lg p-4">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.category}</p>
              <div className='flex justify-between'>
              <p className="text-gray-500 line-through">{`$${product.price.original}`}</p>
              <p className='text-lg font-bold '>{product.price.discount}</p>
              </div>
              
              <p className="text-lg font-bold">{`$${product.price.current}`}</p>
             
              <button className="mt-4 bg-yellow-400 text-white py-2 px-4 rounded hover:bg-yellow-500">
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
