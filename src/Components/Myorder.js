import React from 'react'
import drones from '../Drones'
import Header from './Header';

export default function Myorder() {
  const orders=[ {
    id: "12345", // Unique Order ID
    date: "2024-11-27", // Order Date
    items: [
      { name: "Drone A", quantity: 1, price: 500 }, // Product details
      { name: "Drone B", quantity: 2, price: 300 },
    ],
    totalPrice: 1100, // Total cost of the order
    status: "Delivered", // Order status
  },
  {
    id: "67890",
    date: "2024-11-25",
    items: [
      { name: "Drone C", quantity: 1, price: 700 },
    ],
    totalPrice: 700,
    status: "Pending",
  }, {
    id: "12345", // Unique Order ID
    date: "2024-11-27", // Order Date
    items: [
      { name: "Drone A", quantity: 1, price: 500 }, // Product details
      { name: "Drone B", quantity: 2, price: 300 },
    ],
    totalPrice: 1100, // Total cost of the order
    status: "Delivered", // Order status
  },
  {
    id: "67890",
    date: "2024-11-25",
    items: [
      { name: "Drone C", quantity: 1, price: 700 },
    ],
    totalPrice: 700,
    status: "Pending",
  },];
  return (
    <div>
      <Header/>
       <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              {/* Order Details */}
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">{`Order #${order.id}`}</h2>
                <p className="text-gray-600">{`Order Date: ${order.date}`}</p>
                <p className="text-gray-600">{`Total Items: ${order.items.length}`}</p>
                <p className="text-gray-800 font-bold">{`Total Price: $${order.totalPrice}`}</p>
              </div>

              {/* Ordered Products */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Products:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {order.items.map((item, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{item.name}</span>
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
  
    </div>
  )
}
