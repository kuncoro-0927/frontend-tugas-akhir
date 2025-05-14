import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Produk yang dipilih
  formData: null, // Form pengiriman user (alamat, dsb)
  shippingOptions: [], // Hasil ongkir dari API
  promo: null, // Informasi promo yang diterapkan
  orderDetails: null, // Detail pesanan (order)
  orderItems: [], // Daftar item dari order
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    // Set data untuk checkout
    setCheckoutItems: (state, action) => {
      state.items = action.payload.items; // Produk yang dipilih
      state.formData = action.payload.formData; // Data form pengiriman
      state.promo = action.payload.promo; // Info promo
      state.shippingOptions = action.payload.shippingOptions; // Opsi ongkir
      state.orderDetails = action.payload.orderDetails;
    },

    // Set detail pesanan (orderDetails)
    orderDetails: (state, action) => {
      state.orderDetails = action.payload; // Simpan detail pesanan
    },

    // Set item pesanan (orderItems)
    setOrderItems: (state, action) => {
      state.orderItems = action.payload; // Simpan item pesanan
    },

    // Clear semua data checkout (reset)
    clearCheckout: (state) => {
      state.items = [];
      state.formData = null;
      state.promo = null;
      state.shippingOptions = [];
      state.orderDetails = null;
      state.orderItems = [];
    },

    // Clear data promo
    clearPromo: (state) => {
      state.promo = null; // Reset promo
    },

    // Action untuk menyimpan data produk yang dipilih dari Cart
    setCartItems: (state, action) => {
      state.items = action.payload; // Simpan produk yang dipilih
    },

    // Action untuk menyimpan form pengiriman
    setFormData: (state, action) => {
      state.formData = action.payload; // Simpan data form pengiriman
    },

    // Action untuk menyimpan opsi ongkir
    setShippingOptions: (state, action) => {
      state.shippingOptions = action.payload; // Simpan hasil ongkir
    },
  },
});

export const {
  setCheckoutItems,
  setOrderDetails,
  setOrderItems,
  clearCheckout,
  clearPromo,
  setCartItems,
  setFormData,
  setShippingOptions,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
