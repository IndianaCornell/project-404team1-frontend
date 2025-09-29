import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@lib/api.js";

export const getRecipes = createAsyncThunk(
  "recipes/getAll",
  async ({ page = 1, limit = 12, ...filters } = {}) => {
    const params = new URLSearchParams({ page, limit, ...filters });
    const response = await api.get(`/recipes?${params}`);
    return response.data;
  },
);


export const getRecipesByCategory = createAsyncThunk(
  "recipes/getByCategory",
  async ({ category, page = 1, limit = 12, ...filters } = {}) => {
    const params = new URLSearchParams({ category, page, limit, ...filters });
    const recipesResponse = await api.get(`/recipes?${params}`);
    return { recipes: recipesResponse.data, category };
  },
);

export const getPopularRecipes = createAsyncThunk(
  "recipes/getPopular",
  async ({ page = 1, limit = 12 } = {}) => {
    const params = new URLSearchParams({ page, limit });
    const response = await api.get(`/recipes/popular?${params}`);
    return response.data;
  },
);

