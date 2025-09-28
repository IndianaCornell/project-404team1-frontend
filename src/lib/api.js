import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: [
    "User",
    "UserStats",
    "Recipes",
    "Favorites",
    "Followers",
    "Following",
  ],
  endpoints: (build) => ({
    // User profile
    getUserProfile: build.query({
      query: (userId) => `/users/${userId}`,
      providesTags: (r, e, id) => [{ type: "User", id }],
    }),
    getUserStats: build.query({
      query: (userId) => `/users/${userId}/stats`,
      providesTags: (r, e, id) => [{ type: "UserStats", id }],
    }),

    // Avatar upload
    uploadAvatar: build.mutation({
      query: ({ userId, file }) => {
        const formData = new FormData();
        formData.append("avatar", file);
        return {
          url: `/users/${userId}/avatar`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: (r, e, { userId }) => [{ type: "User", id: userId }],
    }),

    // Follow / Unfollow
    followUser: build.mutation({
      query: (userId) => ({ url: `/users/${userId}/follow`, method: "POST" }),
      invalidatesTags: (r, e, userId) => [
        { type: "UserStats", id: userId },
        { type: "Followers", id: userId },
        { type: "Following", id: "me" },
      ],
    }),
    unfollowUser: build.mutation({
      query: (userId) => ({ url: `/users/${userId}/follow`, method: "DELETE" }),
      invalidatesTags: (r, e, userId) => [
        { type: "UserStats", id: userId },
        { type: "Followers", id: userId },
        { type: "Following", id: "me" },
      ],
    }),

    // Lists with server pagination
    getUserRecipes: build.query({
      query: ({ userId, page = 1, limit = 12 }) =>
        `/users/${userId}/recipes?page=${page}&limit=${limit}`,
      providesTags: (r, e, { userId }) => [{ type: "Recipes", id: userId }],
    }),
    getUserFavorites: build.query({
      query: ({ userId, page = 1, limit = 12 }) =>
        `/users/${userId}/favorites?page=${page}&limit=${limit}`,
      providesTags: (r, e, { userId }) => [{ type: "Favorites", id: userId }],
    }),

    // Delete own recipe or remove from favorites
    deleteRecipe: build.mutation({
      query: (recipeId) => ({ url: `/recipes/${recipeId}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Recipes" }, { type: "UserStats" }],
    }),
    deleteFromFavorites: build.mutation({
      query: (recipeId) => ({
        url: `/favorites/${recipeId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Favorites" }, { type: "UserStats" }],
    }),

    // Followers / Following
    getFollowers: build.query({
      query: ({ userId, page = 1, limit = 12 }) =>
        `/users/${userId}/followers?page=${page}&limit=${limit}`,
      providesTags: (r, e, { userId }) => [{ type: "Followers", id: userId }],
    }),
    getFollowing: build.query({
      query: ({ userId, page = 1, limit = 12 }) =>
        `/users/${userId}/following?page=${page}&limit=${limit}`,
      providesTags: (r, e, { userId }) => [
        { type: "Following", id: userId || "me" },
      ],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useGetUserStatsQuery,
  useUploadAvatarMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetUserRecipesQuery,
  useGetUserFavoritesQuery,
  useDeleteRecipeMutation,
  useDeleteFromFavoritesMutation,
  useGetFollowersQuery,
  useGetFollowingQuery,
} = api;
