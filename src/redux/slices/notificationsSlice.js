import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        type: action.payload.type, // "success" | "error" | "info"
        message: action.payload.message,
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { showNotification, removeNotification, clearNotifications } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
