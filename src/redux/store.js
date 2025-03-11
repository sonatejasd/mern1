import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga"

import logger from "redux-logger";


const sagaMiddleware = createSagaMiddleware();


export const appStore = configureStore({
    reducer: {
        appReducer, // This is where you would add your reducers
        
    },
    middleware: () => [sagaMiddleware, logger]
})

sagaMiddleware.run(rootSaga);

