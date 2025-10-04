import { BASE_URL } from "./BaseUrl";
import axios from "axios";

export const apiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiInstanceImages = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const token = {
  set(token) {
    apiInstance.defaults.headers.Authorization = `Bearer ${token}`;
    apiInstanceImages.defaults.headers.Authorization = `Bearer ${token}`;
  },
  unset() {
    apiInstance.defaults.headers.Authorization = "";
    apiInstanceImages.defaults.headers.Authorization = "";
  },
};

export const authApi = {
  register: (data) => apiInstance.post("/api/auth/register", data),
  login: (data) => apiInstance.post("/api/auth/login", data),
  refresh: () => apiInstance.get("/api/auth/refresh"),
  logout: () => apiInstance.post("/api/auth/logout"),
};

export const userApi = {
  getProfile: (id) => apiInstance.get(`/api/users/profile/${id}`),
  followUser: (id) => apiInstance.post(`/api/users/follow/${id}`),
  unfollowUser: (id) => apiInstance.delete(`/api/users/follow/${id}`),
  getFollowers: (id, params) =>
    apiInstance.get(`/api/users/followers/${id}`, { params }),
  getFollowing: (params) => apiInstance.get(`/api/users/following`, { params }),
  updateAvatar: (data) => apiInstanceImages.patch("/api/users/avatars", data),
};

export const recipeApi = {
  getRecipes: (id, params) => apiInstance.get(`/api/recipes/${id}`, { params }),
  deleteRecipe: (id) => apiInstance.delete(`/api/recipes/${id}`),
  getFavoriteRecipes: (params) =>
    apiInstance.get("/api/recipes/favorites/all", { params }),
  addToFavorites: (id) => apiInstance.post(`/api/recipes/${id}/favorite`),
  removeFromFavorites: (id) =>
    apiInstance.delete(`/api/recipes/${id}/favorite`),
  createRecipe: (formData) => apiInstanceImages.post("/api/recipes/", formData),
};

export const categoriesApi = {
  getCategories: () => apiInstance.get("/api/categories"),
  getMoreCategories: (value) =>
    apiInstance.get(`/api/categories?page=${value}`),
};

export const recipesApi = {
  getRecipes: (category, params) =>
    apiInstance.get(`/api/recipes/filter/${category}`, { params }),

  getRecipe: (id) => apiInstance.get(`/api/recipes/public/${id}`),
  getPopular: (params) => apiInstance.get(`/api/recipes/popular`, { params }),
};

export const testimonialsApi = {
  getTestimonials: () => apiInstance.get("/api/testimonials"),
};

export const areasApi = {
  getAreas: () => apiInstance.get("/api/areas"),
};

export const ingredientsApi = {
  getIngredients: () => apiInstance.get("/api/ingredients"),
};
