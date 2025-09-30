import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "@lib/api.js";


export const getCategories = createAsyncThunk("categories/getAll", async () => {
  const response = await api.get("/categories");
  return response.data;
});
