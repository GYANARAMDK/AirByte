import React, { useEffect, useState } from 'react'
import Header from './Header';
import Footer from './Footer';
import { SetCartProdutcs } from '../Redux/CartSlice';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { SetOrder } from '../Redux/OrderSlice';
export default function Cart() {

  const Navigate = useNavigate();
  const Dispatch = useDispatch();
 
  const [refreshcart, setrefreshcart] = useState(false);
  const [carts,setcarts]=useState([])
  const token = useSelector(state => state.User.AuthToken)
  const cart = useSelector(state => state.Cart.CartProducts)
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const HandleRemove = async (e) => {
    e.preventDefault();

    try {
      const productId = e.currentTarget.getAttribute('data-id')
      const response = await axios.put(
        'https://airbytebackend.onrender.com/user/cart/removeitem',
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        console.log("product removed from successfully");
        setrefreshcart(!refreshcart);
        alert("product removed from cart")
      }
    } catch (error) {
      console.error("Error removed from cart:", error);
      if (error.response) console.log(error.response.data.message);
    }

  }

 
  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => reject(false);
        document.body.appendChild(script);
    });
};
  const Handleorders = async () => {
    try {
      const createOrderResponse = await axios.post('https://airbytebackend.onrender.com/user/orders', {
        shippingAddress: '123 Street, City', 
        
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!createOrderResponse.data.success) {
        alert('Failed to create the order. Please try again.');
        return;
      }
      const order = createOrderResponse.data.razorpayorder; // Backend-created Razorpay order
      console.log('Order created successfully:', order);
      const openRazorpayCheckout = async() => {
        const scriptLoaded = await loadRazorpayScript();

        if (!scriptLoaded) {
          alert("Failed to load Razorpay SDK. Are you online?");
          console.log("hello how are you")
          return;

        }
      
        // Check if Razorpay is available
        if (typeof window.Razorpay === 'undefined') {
          alert("Razorpay is not defined. Try reloading the page.");
          return;
        }
        return new Promise((resolve, reject) => {
          const options = {
            key: 'rzp_test_8m1gQ1rh22bmJ9', // Replace with your Razorpay key
            amount: order.amount, // Amount in paise (e.g., ₹500 = 50000)
            currency: 'INR',
            name: 'AirByte',
            description: 'Order Payment',
            order_id: order.id, // Razorpay order ID
            handler: (response) => {
              resolve(response); // Resolve with payment response
            },
            prefill: {
              name: 'Gyanaram Name',
              email: 'customer@example.com',
              contact: '8290970712',
            },
            theme: {
              color: '#3399cc',
            },
          };
          const razorpayInstance = new window.Razorpay(options);
          razorpayInstance.open();
          razorpayInstance.on('payment.failed', (error) => {
            reject(error);
          });
        });
      };
      const paymentResponse = await openRazorpayCheckout();
      console.log('Payment successful:', paymentResponse);

      const verifyPaymentResponse = await axios.post('https://airbytebackend.onrender.com/user/orders/verify', {   
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,  //(3)
        razorpay_signature: paymentResponse.razorpay_signature,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (verifyPaymentResponse.data.success) {
        alert('Order placed successfully!');
        // console.log('Verified order details:', verifyPaymentResponse.data.order);
        Dispatch(SetOrder({orders:verifyPaymentResponse.data.order}))
        console.log(order);
      } else {
        alert('Payment verification failed.');
      }
      
      Dispatch(SetCartProdutcs({ cartproducts: [] }));
      // setrefreshcart(!refreshcart);

    } catch (error) {
      console.error('Error handling the order process:', error);
      alert('Something went wrong during the order process. Please try again.');
    }
  }
   
  const handlenegativeclick = async (e) => {
    e.preventDefault();
    const productId = e.currentTarget.getAttribute('data-id');
    const quantity = e.currentTarget.getAttribute('data-quantity') - 1;
    try {
      const response = await axios.patch(
        'https://airbytebackend.onrender.com/user/cart/updateitem',
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        console.log("product updation successfully");
        setrefreshcart(!refreshcart);
      }
    } catch (error) {
      console.error("Error update from cart:", error);
      if (error.response) console.log(error.response.data.message);
    }

  }
  const handlepositiveclick = async (e) => {
    e.preventDefault();
    const productId = e.currentTarget.getAttribute('data-id');
    const quantity = Number(e.currentTarget.getAttribute('data-quantity')) + 1;
    try {
      const response = await axios.patch(
        'https://airbytebackend.onrender.com/user/cart/updateitem',
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        console.log("product updation successfully");
        setrefreshcart(!refreshcart);
      }
    } catch (error) {
      console.error("Error update from cart:", error);
      if (error.response) console.log(error.response.data.message);
    }
  }
  useEffect(() => {

    if (!token) {
      alert("please login in ")
      Navigate('/login', { state: { from: '/Cart' } })
    }
    (async function fetchdata() {
      try {
        const response = await axios.get(
          'https://airbytebackend.onrender.com/user/cart/get',

          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.status === 200) {
          Dispatch(SetCartProdutcs({
            cartproducts: await response.data.cart || []
            
          }))
          setcarts(response.data.cart);
        }
        console.log(cart)
      } catch (error) {
        alert("something went wrong")
        if (error.response) console.log(error.response.data.message);
      }
    })();
  }, [refreshcart])
  return (
    <div>
        <Header/>
      <div className="flex flex-col md:flex-row gap-6 p-6">
        {/* Cart Items Section */}
        <div className="flex-1 border rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
          {carts.length === 0 ? (
            <p>Your cart is empty!</p>
          ) : (
            carts.map((item) => (
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
                  <h3 className="font-semibold">{item.productId.name}</h3>
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
                    data-Id={item.productId._id}
                    data-quantity={item.quantity}
                    onClick={handlenegativeclick}
                  >
                    -
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    // onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 text-gray-600 px-2 py-1 rounded"
                    data-Id={item.productId._id}
                    data-quantity={item.quantity}
                    onClick={handlepositiveclick}
                  >
                    +
                  </button>
                </div>
                {/* Remove Button */}
                <button
                  // onClick={() => onRemoveItem(item.id)}
                  className="text-red-500 font-bold"
                  data-Id={item.productId._id}
                  onClick={HandleRemove}
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
          <button className="mt-4 w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-500"
            onClick={Handleorders}>
            Proceed to Checkout
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
