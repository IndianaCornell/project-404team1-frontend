import { BASE_URL } from "./BaseUrl";
import axios from "axios";

import { store } from "@/redux/store";
import { logoutUser } from "@redux/slices/authOperations";
import { openAuthModal } from "@redux/slices/modalsSlice";
import { showNotification } from "@redux/slices/notificationsSlice";

// ====== Основний інстанс з куками ======
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

// ====== Управління Bearer-токеном ======
export const token = {
  set(token) {
    const bearer = `Bearer ${token}`;
    apiInstance.defaults.headers.common.Authorization = bearer;
    apiInstanceImages.defaults.headers.common.Authorization = bearer;
    localStorage.setItem("token", token);
  },
  unset() {
    delete apiInstance.defaults.headers.common.Authorization;
    delete apiInstanceImages.defaults.headers.common.Authorization;
    localStorage.removeItem("token");
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
const savedToken = localStorage.getItem("token");
if (savedToken) token.set(savedToken);

// необязательный перехватчик для наглядных логов
apiInstance.interceptors.response.use(
  (r) => r,
  (err) => {
    console.error(
      "API Error:",
      err?.response?.status,
      err?.response?.data || err?.message
    );
    return Promise.reject(err);
  }
);

// ====== Глобальний перехоплювач 401 ======
const handleUnauthorized = () => {
  const state = store.getState();
  if (state.auth.isLoggedIn) {
    store.dispatch(logoutUser());
    store.dispatch(
      showNotification({
        type: "error",
        message: "Session is invalid, leave again",
        autoClose: 3000,
      })
    );
    store.dispatch(openAuthModal("signin"));
  }
};

apiInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) handleUnauthorized();
    return Promise.reject(error);
  }
);
apiInstanceImages.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) handleUnauthorized();
    return Promise.reject(error);
  }
);

// ====== API-сервіси ======
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
