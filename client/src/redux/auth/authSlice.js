import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    action: ''
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action)=>{
            state.user = action.payload;
        },
        clearAuth: (state)=>{
            state.user = null
        },
        setAction: (state, action)=>{
            state.action = action.payload;
        }
    }
})

export const {setAuth, clearAuth, setAction} = authSlice.actions;
export default authSlice.reducer;