import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
})

sagaMiddleware.run()