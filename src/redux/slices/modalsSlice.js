import { createSlice } from "@reduxjs/toolkit";

// ===== Початковий стан =====
const initialState = {
  activeModal: null,
};

// ===== Slice =====
const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openAuthModal: (state, action) => {
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = null;
    },
  },
});

// ===== Експорти =====
export const { openAuthModal, closeModal } = modalsSlice.actions;
export default modalsSlice.reducer;
