import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // menggunakan localStorage
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import adminReducer from "./adminSlice";
import cartReducer from "./cartSlice";
import cartDrawerReducer from "./cartDrawer";
import checkoutReducer from "./checkoutSlice";
import { combineReducers } from "redux";
import wishlistReducer from "./wishlistSlice";
import notificationReducer from "./notificationSlice";

// Konfigurasi Redux Persist untuk seluruh reducer
const persistConfig = {
  key: "root", // Ganti dengan 'root' agar seluruh state dipersistensikan
  storage, // gunakan localStorage atau sessionStorage
};

const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
  auth: authReducer,
  cart: cartReducer,
  cartDrawer: cartDrawerReducer,
  checkout: checkoutReducer,
  wishlist: wishlistReducer,
  notification: notificationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // menggunakan persistedReducer di seluruh aplikasi
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // menonaktifkan pengecekan serializable untuk persist
    }),
});

export const persistor = persistStore(store);
