import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../utils/axios";
import { logout } from "./userSlice";
import { fetchUser } from "./userSlice";

// Contoh thunk ambil jumlah item keranjang dari backend
export const fetchCartItemCount = createAsyncThunk(
  "cart/fetchCartItemCount",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/get/cart/user/${userId}`);
      return response.data.item_count;
    } catch (error) {
      return rejectWithValue(error.response.data);
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

    // Data custom frame upload
    customFrameDetails: {
      width: "", // cm
      height: "", // cm
      notes: "",
      croppedImage: null, // base64 atau url hasil crop
      originalImageSrc: null, // base64 atau url gambar asli upload
    },
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
      state.customFrameDetails = {
        width: "",
        height: "",
        notes: "",
        croppedImage: null,
        originalImageSrc: null,
      };
    },

    // Reducer baru untuk update data custom frame
    setCustomFrameDetails: (state, action) => {
      state.customFrameDetails = {
        ...state.customFrameDetails,
        ...action.payload,
      };
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
        state.customFrameDetails = {
          width: "",
          height: "",
          notes: "",
          croppedImage: null,
          originalImageSrc: null,
        };
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
          state.error = null;
          state.loading = false;
          state.customFrameDetails = {
            width: "",
            height: "",
            notes: "",
            croppedImage: null,
            originalImageSrc: null,
          };
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
  setCustomFrameDetails,
} = cartSlice.actions;

export default cartSlice.reducer;
