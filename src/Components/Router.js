import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router'
import AirByte from './AirByte'
import Products from './Products'
import Cart from  './Cart'
import ContactUs from './ContactUs'
import MyOrder from './Myorder'
import Profile from './Profile'
import ProductDetails from './ProductDetails'
import Login from './Login'
import SignUp from './SignUp'
export default function Router() {
  return (
    <div>
      <BrowserRouter>
         <Routes>
            <Route path='/Login' element={<Login/>}></Route>
            <Route path='/SignUp' element={<SignUp/>}></Route>
            <Route path='/' element={<AirByte/>}></Route>
            <Route path='/AirByte' element={<AirByte/>} ></Route>
            <Route path='/Products' element={<Products/>}></Route>
            <Route path='/Product/:id' element={<ProductDetails/>}></Route>
            <Route path='/Profile' element={<Profile/>}></Route>
            <Route path='/Cart' element={<Cart/>}></Route>
            <Route path='/ContactUs' element={<ContactUs/>}></Route>
            <Route path='/MyOrders' element={<MyOrder/>}></Route>
         </Routes>
      </BrowserRouter>
    </div>
  )
}
