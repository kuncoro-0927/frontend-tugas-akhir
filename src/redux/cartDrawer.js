import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDrawerOpen: false,
};

const cartDrawerSlice = createSlice({
  name: "cartDrawer",
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.isDrawerOpen = true;
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
    },
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
  },
});

export const { openDrawer, closeDrawer, toggleDrawer } =
  cartDrawerSlice.actions;
export default cartDrawerSlice.reducer;
