import { createSlice } from "@reduxjs/toolkit";

const initialState=({
       CartProducts:[]
});

const CartSlice=createSlice({

    name:'Cart',
    initialState,
    reducers: {
        SetCartProdutcs:(state,action)=>{
            state.CartProducts=action.payload.cartproducts;
        }
        
    }

})
 export const {SetCartProdutcs} =CartSlice.actions;
export default CartSlice.reducer;