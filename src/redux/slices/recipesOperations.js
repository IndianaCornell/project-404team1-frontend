import { createAsyncThunk } from "@reduxjs/toolkit";
import recipesJson from "@/mocks/recipes.json";

const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export const getRecipes = createAsyncThunk("recipes/getAll", async () => {
  await delay(150);
  return recipesJson;
});
