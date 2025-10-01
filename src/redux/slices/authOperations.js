import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@lib/api.js";

const setAuthHeader = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  api.defaults.headers.common.Authorization = "";
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials) => {
    const response = await api.post("/auth/register", credentials);
    const { token } = response.data;

    localStorage.setItem("token", token);
    setAuthHeader(token);

    return response.data;
  }
);

export const loginUser = createAsyncThunk("auth/login", async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  const { token } = response.data;

  localStorage.setItem("token", token);
  setAuthHeader(token);

  return response.data;
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await api.post("/auth/logout");

  localStorage.removeItem("token");
  clearAuthHeader();
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token || localStorage.getItem("token");

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("No token found");
    }

    setAuthHeader(persistedToken);
    const response = await api.get("/users/me");
    return response.data;
  }
);

export { api, setAuthHeader, clearAuthHeader };
