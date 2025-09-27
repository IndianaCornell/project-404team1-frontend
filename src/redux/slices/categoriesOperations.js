import { createAsyncThunk } from "@reduxjs/toolkit";
import categoriesJson from "@/mocks/categories.json";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export const getCategories = createAsyncThunk("categories/getAll", async () => {
  await delay(120);
  return categoriesJson;
});
