import { BASE_URL } from "./BaseUrl";
import axios from "axios";

// --- axios instances ---
export const apiInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ВАЖНО: для multipart не ставим Content-Type вручную,
// чтобы браузер проставил boundary сам.
export const apiInstanceImages = axios.create({
  baseURL: BASE_URL,
});

// --- auth header helper ---
export const token = {
  set(jwt) {
    apiInstance.defaults.headers.Authorization = `Bearer ${jwt}`;
    apiInstanceImages.defaults.headers.Authorization = `Bearer ${jwt}`;
  },
  unset() {
    apiInstance.defaults.headers.Authorization = "";
    apiInstanceImages.defaults.headers.Authorization = "";
  },
};

// подтянуть токен из localStorage при старте
const savedToken =
  typeof window !== "undefined" && localStorage.getItem("token");
if (savedToken) token.set(savedToken);

// необязательный перехватчик для наглядных логов
apiInstance.interceptors.response.use(
  (r) => r,
  (err) => {
    // eslint-disable-next-line no-console
    console.error(
      "API Error:",
      err?.response?.status,
      err?.response?.data || err?.message
    );
    return Promise.reject(err);
  }
);

// --- helpers ---
const isMongoId = (v) => typeof v === "string" && /^[a-f\d]{24}$/i.test(v);

// --- AUTH ---
export const authApi = {
  register: (data) => apiInstance.post("/api/auth/register", data),
  login: (data) => apiInstance.post("/api/auth/login", data),
  getMe: () => apiInstance.get("/api/users/me"),
  logout: () => apiInstance.post("/api/auth/logout"),
};

// --- USERS (Mongo _id) ---
export const userApi = {
  // профиль по Mongo ObjectId
  getProfile: (mongoId) => apiInstance.get(`/api/users/${mongoId}`),

  followUser: (mongoId) => apiInstance.post(`/api/users/follow/${mongoId}`),
  unfollowUser: (mongoId) => apiInstance.delete(`/api/users/follow/${mongoId}`),

  getFollowers: (params) => apiInstance.get("/api/users/followers", { params }),
  getFollowing: (params) => apiInstance.get("/api/users/following", { params }),

  updateAvatar: (formData) =>
    apiInstanceImages.patch("/api/users/avatar", formData),
  getFollowersByUser: (id, params) => apiInstance.get(`/api/users/${id}/followers`, { params }),
  getFollowingByUser: (id, params) => apiInstance.get(`/api/users/${id}/following`, { params }),
};

// --- RECIPES (numeric userId) ---
export const recipeApi = {
  getRecipes: (userId, params) => {
    return apiInstance.get(`/api/recipes/${userId}`, { params });
  },
  getMyRecipes: (params) => apiInstance.get(`/api/recipes/my`, { params }),
  deleteRecipe: (id) => apiInstance.delete(`/api/recipes/${id}`),

  getFavoriteRecipes: (params) =>
    apiInstance.get("/api/recipes/favorites/all", { params }),
   addToFavorites: (id) => apiInstance.post(`/api/recipes/${id}/favorite`),
  removeFromFavorites: (id) =>
    apiInstance.delete(`/api/recipes/${id}/favorite`),

  createRecipe: (formData) => apiInstanceImages.post("/api/recipes", formData),
  getUserRecipes: (ownerId, params) =>
    apiInstance.get(`/api/recipes/owner/${ownerId}`, { params }),
};

// --- CATALOGS / PUBLIC ---
export const categoriesApi = {
  getCategories: () => apiInstance.get("/api/categories"),
  getMoreCategories: (page) => apiInstance.get(`/api/categories?page=${page}`),
};

export const recipesApi = {
  getRecipes: (category, params) =>
    apiInstance.get(`/api/recipes/filter/${category}`, { params }),
  getRecipe: (id) => apiInstance.get(`/api/recipes/public/${id}`),
  getPopular: (params) => apiInstance.get("/api/recipes/popular", { params }),
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
