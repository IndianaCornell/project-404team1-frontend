import { createAsyncThunk } from "@reduxjs/toolkit";
import { recipeApi } from "@/services/Api";

import { api } from "@/lib/api";

const buildParams = (base = {}) => {
  const params = new URLSearchParams();
  Object.entries(base).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== "") {
      params.append(key, String(val));
    }
  });
  return params;
};

export const getRecipes = createAsyncThunk(
  "recipes/getAll",
  async ({ page = 1, limit = 12, ...filters } = {}, { rejectWithValue }) => {
    try {
      const params = buildParams({ page, limit, ...filters });
      const { data } = await recipeApi.get(`/recipes?${params.toString()}`);
      return data;
    } catch (e) {
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const getRecipesByCategory = createAsyncThunk(
  "recipes/getByCategory",
  async (
    { category, page = 1, limit = 12, ...filters } = {},
    { rejectWithValue }
  ) => {
    try {
      const params = buildParams({ category, page, limit, ...filters });
      const { data } = await api.get(`/recipes?${params.toString()}`);

      const items = Array.isArray(data)
        ? data
        : (data.items ?? data.data ?? []);
      const total =
        typeof data?.total === "number" ? data.total : (items?.length ?? 0);
      const pageN = Number(data?.page ?? page);
      const limitN = Number(data?.limit ?? limit);

      return {
        category,
        recipes: { items, total, page: pageN, limit: limitN },
      };
    } catch (e) {
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const getPopularRecipes = createAsyncThunk(
  "recipes/getPopular",
  async ({ page = 1, limit = 12 } = {}, { rejectWithValue }) => {
    try {
      const params = buildParams({ page, limit });
      const { data } = await recipeApi.get(
        `/recipes/popular?${params.toString()}`
      );
      return data;
    } catch (e) {
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const addRecipe = createAsyncThunk(
  "recipes/add",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await recipeApi.createRecipe(formData);
      return data;
    } catch (e) {
      console.error("addRecipe error:", e.response?.data || e.message);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
