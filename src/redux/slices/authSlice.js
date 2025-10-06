import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUser,
  getUserProfile,
} from "./authOperations";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error =
    action.payload ?? action.error?.message ?? "Something went wrong";
};

const sanitizeUser = (u) => {
  if (!u) return null;
  const favorites = Array.isArray(u.favorites) ? u.favorites.map(String) : [];
  return { ...u, favorites };
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setTestUser: (state, action) => {
      state.user = sanitizeUser(action.payload.user);
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.error = null;
      state.isLoading = false;
    },
    clearTestUser: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
    addFavoriteLocal: (state, action) => {
      if (!state.user) return;
      const id = String(action.payload);
      const set = new Set((state.user.favorites ?? []).map(String));
      set.add(id);
      state.user.favorites = Array.from(set);
    },
    removeFavoriteLocal: (state, action) => {
      if (!state.user) return;
      const id = String(action.payload);
      state.user.favorites = (state.user.favorites ?? [])
        .map(String)
        .filter((x) => x !== id);
    },
    updateAvatar: (state, action) => {
      if (state.user) {
        state.user.avatar = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = sanitizeUser(action.payload.user);
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, handleRejected)

      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = sanitizeUser(action.payload.user);
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, handleRejected)

      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.rejected, handleRejected)

      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        const incomingUser = action.payload?.user ?? action.payload;
        state.user = sanitizeUser(incomingUser);
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.error =
          action.payload ?? action.error?.message ?? "Refresh failed";
      })
      .addCase(getUserProfile.pending, handlePending)
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.userProfile = action.payload; 
      })
      .addCase(getUserProfile.rejected, handleRejected);
  },
});

export const {
  clearError,
  setTestUser,
  clearTestUser,
  addFavoriteLocal,
  removeFavoriteLocal,
  updateAvatar,
} = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;
export const selectFavorites = (state) => state.auth.user?.favorites ?? [];
