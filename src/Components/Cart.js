import React from 'react'
import drones from '../Drones';

export default function Cart() {
  const cartItems=drones
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <div>
       <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Cart Items Section */}
      <div className="flex-1 border rounded-lg p-4">
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b py-4"
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              {/* Product Details */}
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">{`Price: $${item.price}`}</p>
                <p className="text-gray-600">{`Subtotal: $${(
                  item.price * item.quantity
                ).toFixed(2)}`}</p>
              </div>
              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  // onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="bg-gray-200 text-gray-600 px-2 py-1 rounded"
                >
                  -
                </button>
                <p>{item.quantity}</p>
                <button
                  // onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-200 text-gray-600 px-2 py-1 rounded"
                >
                  +
                </button>
              </div>
              {/* Remove Button */}
              <button
                // onClick={() => onRemoveItem(item.id)}
                className="text-red-500 font-bold"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* Order Summary Section */}
      <div className="w-full md:w-1/3 border rounded-lg p-4">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <div className="mb-4">
          <p className="flex justify-between">
            <span>Subtotal:</span>
            <span>{`$${totalPrice.toFixed(2)}`}</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (10%):</span>
            <span>{`$${(totalPrice * 0.1).toFixed(2)}`}</span>
          </p>
        </div>
        <p className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>{`$${(totalPrice * 1.1).toFixed(2)}`}</span>
        </p>
        <button className="mt-4 w-full bg-yellow-400 text-white py-2 rounded hover:bg-yellow-500">
          Proceed to Checkout
        </button>
      </div>
    </div>
    </div>
  )
}
