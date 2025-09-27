import { configureStore, createSlice } from "@reduxjs/toolkit";
import { api } from "../lib/api";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, user: null }, // user: { id, name, ... }
  reducers: {
    setCredentials: (s, a) => {
      s.token = a.payload.token;
      s.user = a.payload.user;
    },
    logOut: (s) => {
      s.token = null;
      s.user = null;
    },
  },
});
export const { setCredentials, logOut } = authSlice.actions;

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

// ✅ селекторы
export const selectToken = (s) => s.auth.token;
export const selectMe = (s) => s.auth.user;
