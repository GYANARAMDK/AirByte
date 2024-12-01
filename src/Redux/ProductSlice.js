import { createSlice } from "@reduxjs/toolkit";

const initialState=({
    products: [],
})

const ProductSlice=createSlice({

    name:'Product',
    initialState,
    reducers: {
        SetProducts: (state,action)=>{
               state.products=action.payload.products;
        }
    }

})
export const {SetProducts}= ProductSlice.actions;

export default ProductSlice.reducer;