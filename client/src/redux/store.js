import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import chatReducer from "./chat/chatSlice"
import routeReducer from "./routes/routeSlice"
import { authApi } from "../service/auth/authService";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "../service/user/userService";
import { messageApi } from "../service/message/messageService";

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    route: routeReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware, messageApi.middleware),
});

setupListeners(store.dispatch);

export default store;
