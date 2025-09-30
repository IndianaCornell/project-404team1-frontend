import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@lib/api.js";

const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export const getRecipes = createAsyncThunk(
  "recipes/getAll",
  async ({ page = 1, limit = 12, ...filters } = {}) => {
    const params = new URLSearchParams({ page, limit, ...filters });
    const response = await api.get(`/recipes?${params}`);
    return response.data;
  }
);

export const getRecipesByCategory = createAsyncThunk(
  "recipes/getByCategory",
  async ({ category, page = 1, limit = 12, ...filters } = {}) => {
    const params = new URLSearchParams({ category, page, limit, ...filters });
    const { data } = await api.get(`/recipes?${params.toString()}`);

    const items  = Array.isArray(data) ? data : (data.items ?? data.data ?? []);
    const total  = data.total ?? items.length ?? 0;
    const pageN  = Number(data?.page  ?? page);
    const limitN = Number(data?.limit ?? limit);

    // ⬇️ саме та форма, яку парсить handleCategoryFulfilled
    return {
      recipes: { items, total, page: pageN, limit: limitN },
      category,
    };
  }
);

export const getPopularRecipes = createAsyncThunk(
  "recipes/getPopular",
  async ({ page = 1, limit = 12 } = {}) => {
    const params = new URLSearchParams({ page, limit });
    const response = await api.get(`/recipes/popular?${params}`);
    return response.data;
  }
);

export const addRecipe = createAsyncThunk("recipes/add", async (newRecipe) => {
  console.log("DISPATCHED RECIPE:", newRecipe);
  await delay(150);
  if (newRecipe.photo) {
    const formData = new FormData();
    formData.append("photo", newRecipe.photo);
    formData.append("data", JSON.stringify({ ...newRecipe, photo: undefined }));
    return {
      ...newRecipe,
      photo: URL.createObjectURL(newRecipe.photo),
    };
  }
  return newRecipe;
});
