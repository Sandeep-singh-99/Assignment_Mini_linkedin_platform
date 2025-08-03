import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import feedSlice from "./slice/feedSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        feed: feedSlice
    }
})

export default store;