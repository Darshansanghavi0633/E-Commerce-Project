import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice.js";
import authReducer from "./features/Auth/AuthSlice.js";
import favoriteReducer from "./features/Favorites/favoriteSlice.js";
import { getFavoritesFromLocalStorage } from "../Utils/localStorage.js";

// Initialize favorites from localStorage
const initialFavorites = getFavoritesFromLocalStorage()|| [];

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favorites: favoriteReducer,
  },
  preloadedState: {
    favorites: initialFavorites, // Set initial state for favorites from localStorage
  },  
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

setupListeners(store.dispatch);
export default store;