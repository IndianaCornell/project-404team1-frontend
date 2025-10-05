import { api } from "@/lib/api";
import { BASE_URL } from "./BaseUrl";
import axios from "axios";

export const apiInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const apiInstanceImages = axios.create({
  baseURL: BASE_URL,
});

export const token = {
  set(jwt) {
    const bearer = `Bearer ${jwt}`;
    apiInstance.defaults.headers.common.Authorization = bearer;
    apiInstanceImages.defaults.headers.common.Authorization = bearer;
    api.defaults.headers.common.Authorization = bearer;
  },
  unset() {
    delete apiInstance.defaults.headers.common.Authorization;
    delete apiInstanceImages.defaults.headers.common.Authorization;
    delete api.defaults.headers.common.Authorization;
  },
};

const saved = localStorage.getItem("token");
if (saved) {
  const parsed = (() => {
    try {
      return JSON.parse(saved);
    } catch {
      return saved;
    }
  })();
  token.set(parsed);
}

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

// --- AUTH ---
export const authApi = {
  register: (data) => apiInstance.post("/api/auth/register", data),
  login: (data) => apiInstance.post("/api/auth/login", data),
  getMe: () => apiInstance.get("/api/users/me"),
  logout: () => apiInstance.post("/api/auth/logout"),
  refresh: () => apiInstance.get("/api/auth/refresh"),
};

export const userApi = {
  getProfile: (id) => apiInstance.get(`/api/users/${id}`),
  followUser: (id) => apiInstance.post(`/api/users/follow/${id}`),
  unfollowUser: (id) => apiInstance.delete(`/api/users/follow/${id}`),
  getFollowers: (params) => apiInstance.get("/api/users/followers", { params }),
  getFollowing: (params) => apiInstance.get("/api/users/following", { params }),
  updateAvatar: (formData) =>
    apiInstanceImages.patch("/api/users/avatar", formData),
  getFollowersByUser: (id, params) =>
    apiInstance.get(`/api/users/${id}/followers`, { params }),
  getFollowingByUser: (id, params) =>
    apiInstance.get(`/api/users/${id}/following`, { params }),
};

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
