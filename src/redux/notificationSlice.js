import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hasNewNotification: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setHasNewNotification(state, action) {
      state.hasNewNotification = action.payload;
    },
    clearNotification(state) {
      state.hasNewNotification = false;
    },
  },
});

export const { setHasNewNotification, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
