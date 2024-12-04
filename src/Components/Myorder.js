import React, { useEffect, useState } from 'react'

import Header from './Header';
import axios from 'axios'
import { useSelector } from 'react-redux';
import Footer from './Footer';
export default function Myorder() {
   const [order,setorder]=useState([]);
  const token = useSelector(state => state.User.AuthToken)
   useEffect( ()=> {
    
    const fetchOrders = async () => {
          try {
            const response= await   axios.get('https://airbytebackend.onrender.com/user/orders',
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            if (response.status===200)
            {
             setorder(response.data)
             console.log(response.data);
            
            }
             console.log("helelo every one ")
             
          } catch (error) {
              console.log("hii")
          }
        }
        fetchOrders();
   },[token])
  
  return (
    <div>
      <Header/>
       <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">My Orders</h1>
      {order.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {order.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              {/* Order Details */}
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2 overflow-hidden">{`Order #${order._id}`}</h2>
                <p className="text-gray-600">{`Order Date: ${order.orderDate}`}</p>
                <p className="text-gray-600">{`Total Items: ${order.products.length}`}</p>
                <p className="text-gray-800 font-bold">{`Total Price: $${order.totalPrice}`}</p>
              </div>

              {/* Ordered Products */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Products:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {order.products.map((item, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{item.productId}</span>
                      <span>{`x${item.quantity}`}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Order Status */}
              <div>
                <p className="text-sm">
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`font-bold ${
                      order.status === "Delivered"
                        ? "text-green-500"
                        : order.status === "Pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    <Footer/>
    </div>
  )
}
