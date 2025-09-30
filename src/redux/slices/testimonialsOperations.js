import { createAsyncThunk } from "@reduxjs/toolkit";
import testimonialsJson from "@/mocks/testimonials.json";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export const getTestimonials = createAsyncThunk(
  "testimonials/getAll",
  async () => {
    await delay(100);
    return testimonialsJson;
  }
);
