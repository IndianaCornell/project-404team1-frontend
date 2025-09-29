import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "./usersOperations";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
  state.isLoading = true;
};

const handleFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.items = action.payload; // масив об'єктів користувачів
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload ?? action.error ?? "Error";
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, handlePending)
      .addCase(getUsers.fulfilled, handleFulfilled)
      .addCase(getUsers.rejected, handleRejected);
  },
});

export default usersSlice.reducer;

// Selectors
export const selectUsers = (state) => state.users.items;
export const selectUsersLoading = (state) => state.users.isLoading;
export const selectUsersError = (state) => state.users.error;
