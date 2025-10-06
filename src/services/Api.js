import { BASE_URL } from './BaseUrl';
import axios from 'axios';
import store from "@/redux/store";
import { logoutUser } from "@redux/slices/authOperations";
import { openAuthModal } from "@redux/slices/modalsSlice";
import { showNotification } from "@redux/slices/notificationsSlice";

// ====== Основний інстанс з куками ======
export const apiInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiInstanceImages = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});


// ====== Управління Bearer-токеном ======
export const token = {
  set(token) {
    apiInstance.defaults.headers.Authorization = `Bearer ${token}`;
    apiInstanceImages.defaults.headers.Authorization = `Bearer ${token}`;
    localStorage.setItem("token", token);
  },
  unset() {
    apiInstance.defaults.headers.Authorization = '';
    apiInstanceImages.defaults.headers.Authorization = '';
    localStorage.removeItem("token");
  },
};

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
  register: data => apiInstance.post('/api/users/signup', data),
  login: data => apiInstance.post('/api/users/signin', data),
  getMe: () => apiInstance.get('/api/users/current'),
  logout: () => apiInstance.post('/api/users/logout'),
};

export const userApi = {
  getProfile: id => apiInstance.get(`/api/users/profile/${id}`),
  followUser: id => apiInstance.post(`/api/users/follow/${id}`),
  unfollowUser: id => apiInstance.delete(`/api/users/follow/${id}`),
  getFollowers: (id, params) =>
    apiInstance.get(`/api/users/followers/${id}`, { params }),
  getFollowing: params => apiInstance.get(`/api/users/following`, { params }),
  updateAvatar: data => apiInstanceImages.patch('/api/users/avatars', data),
};

export const recipeApi = {
  getRecipes: (id, params) => apiInstance.get(`/api/recipes/${id}`, { params }),
  deleteRecipe: id => apiInstance.delete(`/api/recipes/${id}`),
  getFavoriteRecipes: params =>
    apiInstance.get('/api/recipes/favorites/all', { params }),
  addToFavorites: id => apiInstance.post(`/api/recipes/favorites/${id}`),
  removeFromFavorites: id => apiInstance.delete(`/api/recipes/favorites/${id}`),
  createRecipe: formData => apiInstanceImages.post('/api/recipes/', formData),
};

export const categoriesApi = {
  getCategories: () => apiInstance.get('/api/categories'),
  getMoreCategories: value => apiInstance.get(`/api/categories?page=${value}`),
};

export const recipesApi = {
  getRecipes: (category, params) =>
    apiInstance.get(`/api/recipes/filter/${category}`, { params }),

  getRecipe: id => apiInstance.get(`/api/recipes/public/${id}`),
  getPopular: params => apiInstance.get(`/api/recipes/popular`, { params }),
};

export const testimonialsApi = {
  getTestimonials: () => apiInstance.get('/api/testimonials'),
};

export const areasApi = {
  getAreas: () => apiInstance.get('/api/areas'),
};

export const ingredientsApi = {
  getIngredients: () => apiInstance.get('/api/ingredients'),
};
