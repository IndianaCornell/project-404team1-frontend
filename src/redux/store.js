import { configureStore } from "@reduxjs/toolkit";

import areasReducer from "./slices/areasSlice";
import categoriesReducer from "./slices/categoriesSlice";
import ingredientsReducer from "./slices/ingredientsSlice";

import recipesReducer from "./slices/recipesSlice";
import usersReducer from "./slices/usersSlice";
import testimonialsReducer from "./slices/testimonialsSlice";
import notificationsReducer from "./slices/notificationsSlice";

export const store = configureStore({
  reducer: {
    areas: areasReducer,
    categories: categoriesReducer,
    ingredients: ingredientsReducer,
    recipes: recipesReducer,
    users: usersReducer,
    testimonials: testimonialsReducer,
    notifications: notificationsReducer,
  },
});
