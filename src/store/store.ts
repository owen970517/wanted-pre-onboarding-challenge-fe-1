import {configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import persistStore from "redux-persist/es/persistStore";
import modalSlice from "./modalSlice";
const reducers = combineReducers({
    auth: authSlice,
    modal:modalSlice,
  });
  
  const persistConfig = {
    key: 'root',
    storage,
    whitelist : ['auth']
  };
  
  const persistedReducer = persistReducer(persistConfig, reducers);
  
  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false
      })
  }); 

export const persistor = persistStore(store);
export default store;

// 리듀서의 타입을 리턴해준다. 
export type RootState = ReturnType<typeof reducers>;
