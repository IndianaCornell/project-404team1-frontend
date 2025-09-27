import { createSlice } from "@reduxjs/toolkit";
import { getTestimonials } from "./testimonialsOperations";

const initialState = { items: [], isLoading: false, error: null };

const handlePending = (s) => {
  s.isLoading = true;
};
const handleFulfilled = (s, a) => {
  s.isLoading = false;
  s.error = null;
  s.items = a.payload;
};
const handleRejected = (s, a) => {
  s.isLoading = false;
  s.error = a.payload ?? a.error ?? "Error";
};

const slice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(getTestimonials.pending, handlePending)
      .addCase(getTestimonials.fulfilled, handleFulfilled)
      .addCase(getTestimonials.rejected, handleRejected);
  },
});

export default slice.reducer;

// Selectors
export const selectTestimonials = (s) => s.testimonials.items;
export const selectTestimonialsLoading = (s) => s.testimonials.isLoading;
export const selectTestimonialsError = (s) => s.testimonials.error;
