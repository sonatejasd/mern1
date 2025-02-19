import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./reducer";
export const appStore = configureStore({
    reducer: {
        appReducer, // This is where you would add your reducers
    }
})

