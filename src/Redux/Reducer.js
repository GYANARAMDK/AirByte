import { combineReducers } from "@reduxjs/toolkit";

import cartreducer from './CartSlice'
import productreducer from './ProductSlice'
import userreducer from './UserSlice'
import orderreducer from './OrderSlice'
const rootreducer=combineReducers({
      Cart: cartreducer,
      Product: productreducer,
      User: userreducer,
      Order: orderreducer
})
export default rootreducer;