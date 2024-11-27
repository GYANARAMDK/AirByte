import { createSlice } from "@reduxjs/toolkit";


const initialState=({
         UserInfo: {name:'',email:'',address:'',phone:'',password:''},
         IsloggedIn:true,
         AuthToken:null

})


const UserSlice =createSlice({
     
    name:'User',
    initialState,
    reducers: {
        LoginUser: (state, action)=>{
            state.UserInfo=action.payload.UserInfo;
            state.IsloggedIn=true;
            state.AuthToken=action.payload.AuthToken;
        },
        LogOutUser:(state,action)=>{
            state.UserInfo=null;
            state.AuthToken=null;
            state.IsloggedIn=false
        },
        UpdateUser:(state,action)=>{
            state.UserInfo=({...state.UserInfo,...action.payload})
        }
        
    }

})
export  const {LoginUser,LogOutUser,UpdateUser} = UserSlice.actions;
export default UserSlice.reducer;