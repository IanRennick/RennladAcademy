import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authReducer from '../features/auth/authSlice';



export const store = configureStore({
    // Reducers
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },

    // Middleware
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),

    // Allow dev tools
    devTools: true
});