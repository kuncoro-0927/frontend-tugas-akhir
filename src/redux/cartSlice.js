import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../utils/axios";
import { logout } from "./userSlice";
import { fetchUser } from "./userSlice";
// Thunk untuk mendapatkan jumlah item di keranjang dari backend
export const fetchCartItemCount = createAsyncThunk(
  "cart/fetchCartItemCount",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/get/cart/user/${userId}`);
      return response.data.item_count; // Mengembalikan item count
    } catch (error) {
      return rejectWithValue(error.response.data); // Menangani error jika gagal
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemCount: 0,
    items: [],
    selectedItems: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
    },

    setSelectedItems: (state, action) => {
      state.selectedItems = action.payload;
    },
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const idToRemove = action.payload;
      state.items = state.items.filter((item) => item.id !== idToRemove);
      state.selectedItems = state.selectedItems.filter(
        (id) => id !== idToRemove
      );
    },
    setItemCount: (state, action) => {
      state.itemCount = action.payload;
    },
    resetCart: (state) => {
      state.items = [];
      state.selectedItems = [];
      state.itemCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItemCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItemCount.fulfilled, (state, action) => {
        state.loading = false;

        state.itemCount = action.payload;
      })
      .addCase(fetchCartItemCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logout, (state) => {
        state.items = [];
        state.selectedItems = [];
        state.itemCount = 0;
        state.error = null;
        state.loading = false;
      })

      .addCase(fetchUser.rejected, (state, action) => {
        const msg = action.payload;
        const isAuthError =
          typeof msg === "string" &&
          (msg.includes("403") || msg.includes("401"));

        if (isAuthError) {
          state.items = [];
          state.selectedItems = [];
          state.itemCount = 0;
          state.error = null; // Reset error jika token invalid
          state.loading = false; // Pastikan loading di-reset
        }
      });
  },
});

export const {
  setCartItems,
  setSelectedItems,
  addToCart,
  removeFromCart,
  setItemCount,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
