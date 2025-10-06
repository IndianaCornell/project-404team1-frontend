import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance as api, token, authApi, userApi } from "@/services/Api";

// --- Register ---
export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApi.register(credentials);
      const { token: accessToken, user } = response.data;

      if (accessToken) {
        token.set(accessToken);
      }

      return { token: accessToken, user };
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
      const response = await authApi.login(credentials);
      const { token: accessToken, user } = response.data;

      if (accessToken) token.set(accessToken);

      return { token: accessToken, user };
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || "Login failed"
      );
    }
  }
);

// --- Logout ---
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await authApi.logout();
      token.unset();
    } catch (error) {
      console.error("Logout request failed:", error?.message);
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Logout failed"
      );
    }
  }
);

// --- Refresh current user ---
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const persistedToken = localStorage.getItem("token");

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      token.set(persistedToken); // застосовуємо токен до всіх запитів
      const { data } = await api.get("/api/users/me");
      return data; // user
    } catch (error) {
      token.unset(); // якщо токен недійсний
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error?.message || "Refresh failed"
      );
    }
  }
);

// --- Get another user's profile ---
export const getUserProfile = createAsyncThunk(
  "auth/getProfile",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await userApi.getProfile(id);
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
