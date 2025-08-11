import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        selectChat: (state, action)=>{
            state.user = action.payload
        }
    }
})

export const {selectChat} = chatSlice.actions;
export default chatSlice.reducer;