import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../utils/axios";
import { logout } from "./userSlice";
import { fetchUser } from "./userSlice";
// Toggle wishlist
export const toggleWishlist = createAsyncThunk(
  "wishlist/toggleWishlist",
  async ({ productId, user_id }, { rejectWithValue }) => {
    try {
      const response = await instance.post("/wishlist", {
        productId,
        user_id,
      });

      return response.data;
    } catch (error) {
      console.error("Toggle wishlist error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Gagal toggle wishlist"
      );
    }
  }
);

// Fetch wishlist by userId
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/get/wishlist/${userId}`);
      return response.data; // Mengembalikan array wishlist
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal mengambil wishlist"
      );
    }
  }
);

const initialState = {
  wishlist: [],
  loading: false,
  error: null,
  message: "",
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    resetWishlist: (state) => {
      state.wishlist = [];
      state.message = "";
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Toggle wishlist
      .addCase(toggleWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        // jangan update state.wishlist di sini, cukup fetch ulang di komponen
      })

      .addCase(toggleWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Terjadi kesalahan";
      })

      // Fetch wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Gagal mengambil wishlist";
      })
      .addCase(logout, (state) => {
        state.wishlist = [];
        state.message = "";
        state.error = null;
        state.loading = false;
      })

      // ✅ Reset wishlist kalau token invalid
      .addCase(fetchUser.rejected, (state, action) => {
        const msg = action.payload;
        const isAuthError =
          typeof msg === "string" &&
          (msg.includes("403") || msg.includes("401"));

        if (isAuthError) {
          state.wishlist = [];
          state.message = "";
          state.error = null;
          state.loading = false;
        }
      });
  },
});

export const { resetWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
