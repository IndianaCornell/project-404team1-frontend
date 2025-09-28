import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "@lib/api.js";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export const getCategories = createAsyncThunk("categories/getAll", async () => {
  const response = await api.get("/categories");
  return response.data;
});
