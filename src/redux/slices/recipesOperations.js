// src/redux/slices/recipesOperations.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { recipeApi } from "@/services/Api";

import { api } from "@/lib/api"; // ✅ alias @ → src; без .js в кінці, щоб Vite сам розширив

// утиліта
const buildParams = (base = {}) => {
  const params = new URLSearchParams();
  Object.entries(base).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== "") {
      params.append(key, String(val));
    }
  });
  return params;
};

// ========================
// GET /recipes
// Підтримує page/limit + будь-які фільтри (ingredient, area, category, ...)
// Повертає те, що очікує ваш handleFulfilled:
//   або { items, total, page, limit }, або масив
// ========================
export const getRecipes = createAsyncThunk(
  "recipes/getAll",
  async ({ page = 1, limit = 12, ...filters } = {}, { rejectWithValue }) => {
    try {
      const params = buildParams({ page, limit, ...filters });
      const { data } = await recipeApi.get(`/recipes?${params.toString()}`);
      // recipeApi.get(`/recipes?${params.toString()}`);
      return data;
    } catch (e) {
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

// ========================
// GET /recipes (за категорією)
// Варіант А (уніфікований): /recipes?category=<cat>&page=&limit=&ingredient=&area=
// Формуємо payload саме у форматі, який чекає handleCategoryFulfilled:
//   { category, recipes: { items, total, page, limit } }
// ========================
export const getRecipesByCategory = createAsyncThunk(
  "recipes/getByCategory",
  async (
    { category, page = 1, limit = 12, ...filters } = {},
    { rejectWithValue }
  ) => {
    try {
      const params = buildParams({ category, page, limit, ...filters });
      const { data } = await api.get(`/recipes?${params.toString()}`);
      // recipeApi.get(`/recipes?${params.toString()}`)

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

// ========================
// GET /recipes/popular
// Можна лишити без фільтрів; page/limit — опційно
// ========================
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

// ========================
// ADD
// ========================

export const addRecipe = createAsyncThunk(
  "recipes/add",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await recipeApi.createRecipe(formData);

      console.log("Recipe created:", data);
      return data;
    } catch (e) {
      console.error("addRecipe error:", e.response?.data || e.message);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
