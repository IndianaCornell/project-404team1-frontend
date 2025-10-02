import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTestimonials = createAsyncThunk(
  "testimonials/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3000/api/testimonials");
      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      const data = await res.json();
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
