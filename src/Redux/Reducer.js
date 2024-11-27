import { combineReducers } from "@reduxjs/toolkit";

import cartreducer from './CartSlice'
import productreducer from './ProductSlice'
import userreducer from './UserSlice'

const rootreducer=combineReducers({
      Cart: cartreducer,
      Product: productreducer,
      User: userreducer
})
export default rootreducer;