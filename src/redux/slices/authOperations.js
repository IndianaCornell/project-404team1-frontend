import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/api.js";

// --- Helpers ---
export const setAuthHeader = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  api.defaults.headers.common.Authorization = "";
};

// --- Register ---
export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", credentials);
      const { token } = response.data;

      localStorage.setItem("token", token);
      setAuthHeader(token);

      return response.data; // { token, user }
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || "Signup failed"
      );
    }
  }
);

// --- Login ---
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", credentials);
      const { token } = response.data;

      localStorage.setItem("token", token);
      setAuthHeader(token);

      return response.data; // { token, user }
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || "Login failed"
      );
    }
  }
);

// --- Logout ---
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.warn("Logout request failed:", error?.message);
  } finally {
    localStorage.removeItem("token");
    clearAuthHeader();
  }
});

// --- Refresh current user ---
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token || localStorage.getItem("token");

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      setAuthHeader(persistedToken);
      const response = await api.get("/users/me");
      return response.data; // user
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error?.message || "Refresh failed"
      );
    }
  }
);

// --- Get another user's profile ---
export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/users/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || {
          message: error.message || "Get profile failed",
        }
      );
    }
  }
);
