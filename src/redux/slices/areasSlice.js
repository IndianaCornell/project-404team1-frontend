import { createSlice } from "@reduxjs/toolkit";
import { getAreas } from "./areasOperations";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  loaded: false,
  lastFetchedAt: null,
};

const handlePending = (state) => {
  state.isLoading = true;
};

const handleFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.items = action.payload;
  state.loaded = true;
  state.lastFetchedAt = Date.now();
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload ?? action.error ?? "Error";
  state.loaded = false;
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
export const selectAreasLoaded = (state) => state.areas.loaded;
export const selectAreasLastFetchedAt = (state) => state.areas.lastFetchedAt;
export const selectAreasReady = (state) =>
  state.areas.loaded && !state.areas.isLoading && state.areas.items.length > 0;
