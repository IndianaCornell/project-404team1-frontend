import { createAsyncThunk } from "@reduxjs/toolkit";
import {authApi, token as axiosTokenHelper } from "@services/Api"

export const setAuthHeader = (token) => {
  axiosTokenHelper.set(token);
};

export const clearAuthHeader = () => {
    axiosTokenHelper.unset();
};

export const registerUser = createAsyncThunk(
  "/api/auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApi.register(credentials);
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

export const loginUser = createAsyncThunk(
  "/api/auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      // const response = await api.post("/auth/login", credentials);
      const response = await authApi.login(credentials);
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

export const logoutUser = createAsyncThunk("/api/auth/logout", async () => {
  try {
    // await api.post("/auth/logout");
    await authApi.logout();
  } catch (error) {
    console.warn("Logout request failed:", error?.message);
  } finally {
    localStorage.removeItem("token");
    clearAuthHeader();
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token || localStorage.getItem("token");
    if (!persistedToken) return thunkAPI.rejectWithValue("No token found");
    try {
      setAuthHeader(persistedToken);
      const { data } = await authApi.refresh();
      return data;
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        clearAuthHeader();
        localStorage.removeItem("token");
        return thunkAPI.rejectWithValue("Unauthorized");
      }
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error?.message || "Refresh failed"
      );
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await authApi.getMe();
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
