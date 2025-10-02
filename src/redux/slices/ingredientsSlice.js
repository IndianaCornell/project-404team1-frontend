import { createSlice } from "@reduxjs/toolkit";
import { getIngredients } from "./ingredientsOperations";

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

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, handlePending)
      .addCase(getIngredients.fulfilled, handleFulfilled)
      .addCase(getIngredients.rejected, handleRejected);
  },
});

export default ingredientsSlice.reducer;

export const selectIngredients = (state) => state.ingredients.items;
export const selectIngredientsLoading = (state) => state.ingredients.isLoading;
export const selectIngredientsError = (state) => state.ingredients.error;

// ✚ нові селектори для кеш-контролю
export const selectIngredientsLoaded = (state) => state.ingredients.loaded;
export const selectIngredientsLastFetchedAt = (state) =>
  state.ingredients.lastFetchedAt;
export const selectIngredientsReady = (state) =>
  state.ingredients.loaded &&
  !state.ingredients.isLoading &&
  state.ingredients.items.length > 0;
