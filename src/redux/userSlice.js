import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../utils/axios";

// Thunk untuk login user
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await instance.post("/login", { email, password }); // API login

      return response.data; // Balikin data user kalau berhasil
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login gagal"); // Error handling
    }
  }
);

// Thunk untuk fetch user dari cookies
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("/user", { withCredentials: true });
      return response.data.data; // Return data user
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk untuk verifikasi OTP dan login
export const verifyOtpAndLogin = createAsyncThunk(
  "user/verifyOtpAndLogin",
  async ({ otp, otpToken }, { rejectWithValue }) => {
    try {
      console.log("Token yang dikirim untuk verifikasi:", otpToken);
      const response = await instance.post(
        "/verify-otp",
        { otp, otpToken },
        { withCredentials: true }
      );
      return response.data.user; // Balikin data user kalau OTP sukses
    } catch (error) {
      return rejectWithValue(error.response?.data || "Verifikasi OTP gagal");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
    isLoggedIn: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict;";
      localStorage.removeItem("cartItems");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch User dari cookies
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoggedIn = !!action.payload; // Kalau ada user, set isLoggedIn jadi true
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isLoggedIn = false; // 👈 penting!
        state.user = null; // 👈 opsional, biar bersih juga
      })

      // Verifikasi OTP dan Login
      .addCase(verifyOtpAndLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOtpAndLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(verifyOtpAndLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export action logout
export const { logout } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
