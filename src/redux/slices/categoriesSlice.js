import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "./categoriesOperations";

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

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, handlePending)
      .addCase(getCategories.fulfilled, handleFulfilled)
      .addCase(getCategories.rejected, handleRejected);
  },
});

export default categoriesSlice.reducer;

export const selectCategories = (state) => state.categories.items;
export const selectCategoriesLoading = (state) => state.categories.isLoading;
export const selectCategoriesError = (state) => state.categories.error;
