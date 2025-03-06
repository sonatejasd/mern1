import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./reducer";
import createSagaMiddleware from "redux-saga";

import logger from "redux-logger";


const sagaMiddleware = createSagaMiddleware();


export const appStore = configureStore({
    reducer: {
        appReducer, // This is where you would add your reducers
        
    },
    middleware: () => [sagaMiddleware, logger]
})

