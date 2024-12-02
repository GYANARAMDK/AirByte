import { createSlice } from "@reduxjs/toolkit";

const initialState=({
    order: [],
})

const OrderSlice=createSlice({

    name:'Order',
    initialState,
    reducers: {
        SetOrder: (state,action)=>{
               state.order=action.payload.orders;
        }
    }

})
export const {SetOrder}= OrderSlice.actions;

export default OrderSlice.reducer;