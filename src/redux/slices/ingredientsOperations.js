import { createAsyncThunk } from "@reduxjs/toolkit";
import ingredientsJson from "@/mocks/ingredients.json";

const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export const getIngredients = createAsyncThunk(
  "ingredients/getAll",
  async () => {
    await delay(120);
    return Array.isArray(ingredientsJson) ? ingredientsJson : [];
  }
);
