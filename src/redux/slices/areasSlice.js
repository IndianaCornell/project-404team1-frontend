import { createSlice } from "@reduxjs/toolkit";
import { getAreas } from "./areasOperations";

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
  state.items = action.payload;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload ?? action.error ?? "Error";
};

const areasSlice = createSlice({
  name: "areas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAreas.pending, handlePending)
      .addCase(getAreas.fulfilled, handleFulfilled)
      .addCase(getAreas.rejected, handleRejected);
  },
});

export default areasSlice.reducer;

// Selectors
export const selectAreas = (state) => state.areas.items;
export const selectAreasLoading = (state) => state.areas.isLoading;
export const selectAreasError = (state) => state.areas.error;
