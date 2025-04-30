// src/redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginToken: null,
  },
  reducers: {
    setLoginToken: (state, action) => {
      state.loginToken = action.payload;
    },
    clearLoginToken: (state) => {
      state.loginToken = null;
    },
  },
});

export const { setLoginToken, clearLoginToken } = authSlice.actions;

export default authSlice.reducer;
