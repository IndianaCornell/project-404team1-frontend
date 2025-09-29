import { createAsyncThunk } from "@reduxjs/toolkit";
import recipesJson from "@/mocks/recipes.json";

const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export const getRecipes = createAsyncThunk("recipes/getAll", async () => {
  await delay(150);
  return recipesJson;
});

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
