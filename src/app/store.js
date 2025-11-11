import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import storage from 'redux-persist/lib/storage';
import rootSaga from "./rootSaga";
import authReducer from '../redux/slices/authSlice'
import usersReducer from '../redux/slices/usersSlice'

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer

})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'users']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
})
export const persistor = persistStore(store)
sagaMiddleware.run(rootSaga)