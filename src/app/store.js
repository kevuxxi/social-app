import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import storage from 'redux-persist/lib/storage';
import rootSaga from "./rootSaga";
import authReducer from '../redux/slices/authSlice'
import usersReducer from '../redux/slices/usersSlice'
import postsReducer from '../redux/slices/postsSlice'
import commentsReducer from '../redux/slices/commentsSlice'
import reactionsReducer from '../redux/slices/reactionsSlice'
import followsReducer from '../redux/slices/followsSlice'
import feedReducer from '../redux/slices/feedSlice'


const sagaMiddleware = createSagaMiddleware();

const postsPersistConfig = {
    key: 'posts',
    storage,
    blacklist: [
        'loading',
        'error',
        'createLoading',
        'createError',
        'createSuccess',
        'detailLoading',
        'detailError'
    ]
}

const usersPersistConfig = {
    key: 'users',
    storage,
    blacklist: ['profileUser']
}

const rootReducer = combineReducers({
    auth: authReducer,
    users: persistReducer(usersPersistConfig, usersReducer),
    posts: persistReducer(postsPersistConfig, postsReducer),
    comments: commentsReducer,
    reactions: reactionsReducer,
    follows: followsReducer,
    feed: feedReducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['users', 'posts']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
})
export const persistor = persistStore(store)
sagaMiddleware.run(rootSaga)
