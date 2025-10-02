import { createSlice } from "@reduxjs/toolkit";
import {
  getPopularRecipes,
  getRecipes,
  getRecipesByCategory,
} from "./recipesOperations";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  selectedCategory: null,
  showRecipes: false,
  totalItems: 0,
  currentPage: 1,
  totalPages: 0,
  itemsPerPage: 12,
  selectedIngredient: null,
  selectedArea: null,
};

const handlePending = (state) => {
  state.isLoading = true;
};

const handleFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
  if (
    action.payload &&
    typeof action.payload === "object" &&
    action.payload.items
  ) {
    state.items = action.payload.items;
    state.totalItems = action.payload.total || 0;
    state.currentPage = action.payload.page || 1;
    state.itemsPerPage = action.payload.limit || 12;
    state.totalPages = Math.ceil(state.totalItems / state.itemsPerPage);
  } else {
    state.items = action.payload;
  }
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload ?? action.error ?? "Error";
};

const handleCategoryFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
  if (
    action.payload?.recipes &&
    typeof action.payload.recipes === "object" &&
    action.payload.recipes.items
  ) {
    state.items = action.payload.recipes.items;
    state.totalItems = action.payload.recipes.total || 0;
    state.currentPage = action.payload.recipes.page || 1;
    state.itemsPerPage = action.payload.recipes.limit || 12;
    state.totalPages = Math.ceil(state.totalItems / state.itemsPerPage);
  } else {
    state.items = action.payload?.recipes || [];
  }
  state.selectedCategory = action.payload.category;
  state.showRecipes = true;
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    resetToCategories: (state) => {
      state.showRecipes = false;
      state.selectedCategory = null;
      state.items = [];
      state.totalItems = 0;
      state.currentPage = 1;
      state.totalPages = 0;
      state.selectedIngredient = null;
      state.selectedArea = null;
    },

    // ====== Фільтри та пагінація ======

    setIngredientFilter: (state, { payload }) => {
      state.selectedIngredient = payload || null;
      state.currentPage = 1;
    },
    setAreaFilter: (state, { payload }) => {
      state.selectedArea = payload || null;
      state.currentPage = 1;
    },
    clearFilters: (state) => {
      state.selectedIngredient = null;
      state.selectedArea = null;
      state.currentPage = 1;
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload || 1;
    },
    setItemsPerPage: (state, { payload }) => {
      state.itemsPerPage = payload || 12;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecipes.pending, handlePending)
      .addCase(getRecipes.fulfilled, handleFulfilled)
      .addCase(getRecipes.rejected, handleRejected)
      .addCase(getRecipesByCategory.pending, handlePending)
      .addCase(getRecipesByCategory.fulfilled, handleCategoryFulfilled)
      .addCase(getRecipesByCategory.rejected, handleRejected)
      .addCase(getPopularRecipes.pending, handlePending)
      .addCase(getPopularRecipes.fulfilled, handleFulfilled)
      .addCase(getPopularRecipes.rejected, handleRejected);
  },
});

export const {
  resetToCategories,
  // експорт нових екшенів:
  setIngredientFilter,
  setAreaFilter,
  clearFilters,
  setCurrentPage,
  setItemsPerPage,
} = recipesSlice.actions;

export default recipesSlice.reducer;

export const selectRecipes = (state) => state.recipes.items;
export const selectRecipesLoading = (state) => state.recipes.isLoading;
export const selectRecipesError = (state) => state.recipes.error;
export const selectSelectedCategory = (state) => state.recipes.selectedCategory;
export const selectShowRecipes = (state) => state.recipes.showRecipes;
export const selectTotalItems = (state) => state.recipes.totalItems;
export const selectCurrentPage = (state) => state.recipes.currentPage;
export const selectTotalPages = (state) => state.recipes.totalPages;
export const selectItemsPerPage = (state) => state.recipes.itemsPerPage;

// ====== Селектори фільтрів ======
export const selectSelectedIngredient = (state) =>
  state.recipes.selectedIngredient;
export const selectSelectedArea = (state) => state.recipes.selectedArea;
