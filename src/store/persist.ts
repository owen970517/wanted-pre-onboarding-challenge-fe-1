import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import authSlice from "./authSlice";

const rootReducer = combineReducers({auth : authSlice});

const persistConfig = {
    key : 'root',
    storage : storage,
    whitelist : ['auth']
}

export default persistReducer(persistConfig, rootReducer);