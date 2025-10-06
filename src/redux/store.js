import { configureStore, combineReducers } from "@reduxjs/toolkit";

import areasReducer from "./slices/areasSlice";
import categoriesReducer from "./slices/categoriesSlice";
import ingredientsReducer from "./slices/ingredientsSlice";

import recipesReducer from "./slices/recipesSlice";
import usersReducer from "./slices/usersSlice";
import testimonialsReducer from "./slices/testimonialsSlice";
import notificationsReducer from "./slices/notificationsSlice";
import authReducer from "./slices/authSlice";
import { logoutUser } from "./slices/authOperations";
import modalsReducer from "./slices/modalsSlice";

const appReducer = combineReducers({
  auth: authReducer,
  areas: areasReducer,
  categories: categoriesReducer,
  ingredients: ingredientsReducer,
  recipes: recipesReducer,
  users: usersReducer,
  testimonials: testimonialsReducer,
  notifications: notificationsReducer,
  modals: modalsReducer,
});

// ===== Головний ред’юсер з reset =====
const rootReducer = (state, action) => {
  if (
    action.type === logoutUser.fulfilled.type ||
    action.type === logoutUser.rejected.type
  ) {
    // ❗ Скидаємо весь Redux state (без localStorage.clear())
    state = undefined;
  }
  return appReducer(state, action);
};

// ===== Store =====
export const store = configureStore({
  reducer: rootReducer,
});
