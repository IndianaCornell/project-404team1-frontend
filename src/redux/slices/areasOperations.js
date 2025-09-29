import { createAsyncThunk } from "@reduxjs/toolkit";
import areasJson from "@/mocks/areas.json";

const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export const getAreas = createAsyncThunk("areas/getAll", async () => {
  await delay(120);
  return Array.isArray(areasJson) ? areasJson : [];
});
