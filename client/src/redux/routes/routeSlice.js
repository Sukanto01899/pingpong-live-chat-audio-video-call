import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    path: 'inbox'
};

const routeSlice = createSlice({
    name: "route",
    initialState,
    reducers: {
        changeRoute: (state, actions)=>{
            state.path = actions.payload;
        }
    }
})

export const {changeRoute} = routeSlice.actions;
export default routeSlice.reducer;