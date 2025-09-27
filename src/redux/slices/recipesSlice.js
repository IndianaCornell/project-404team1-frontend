import { createSlice } from "@reduxjs/toolkit";
import { getRecipes } from "./recipesOperations";

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

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecipes.pending, handlePending)
      .addCase(getRecipes.fulfilled, handleFulfilled)
      .addCase(getRecipes.rejected, handleRejected);
  },
});

export default recipesSlice.reducer;

export const selectRecipes = (state) => state.recipes.items;
export const selectRecipesLoading = (state) => state.recipes.isLoading;
export const selectRecipesError = (state) => state.recipes.error;
