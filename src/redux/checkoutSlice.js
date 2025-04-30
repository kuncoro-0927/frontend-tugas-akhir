import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippingMethod: null,
  items: [],
  formData: null, // ⬅️ form pengiriman user
  shippingOptions: [], // ⬅️ semua hasil ongkir dari API
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckoutItems: (state, action) => {
      state.shippingMethod = action.payload.shippingMethod;
      state.items = action.payload.items;
      state.formData = action.payload.formData;
      state.shippingOptions = action.payload.shippingOptions;
    },
    clearCheckout: (state) => {
      state.shippingMethod = null;
      state.items = [];
      state.formData = null;
      state.shippingOptions = [];
    },
  },
});

export const { setCheckoutItems, clearCheckout } = checkoutSlice.actions;

export default checkoutSlice.reducer;
