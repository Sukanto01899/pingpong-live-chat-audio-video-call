import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectChat: (state, action) => {
      // Always update user and clear messages when selecting
      if (state?.user?._id === action.payload._id) return;
      state.user = action.payload;
      state.messages = []; // Clear messages for new user
    },
    removeChat: (state)=>{
      state.user = null
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      const isExistMsg = state.messages.some(
        (msg) => msg._id === action.payload._id
      );
      if (isExistMsg) return;
      // Add new message to the end (newest messages at bottom)
      state.messages = [...state.messages, action.payload];
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { selectChat, setMessages, addMessage, clearMessages, removeChat } =
  chatSlice.actions;

export default chatSlice.reducer;
