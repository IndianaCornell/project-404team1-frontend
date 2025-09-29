// src/lib/api.js
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
    "UserById",
    "Recipes",
    "Favorites",
    "Followers",
    "Following",
  ],
  endpoints: (b) => ({
    // Мій профіль (для власної сторінки)
    getMe: b.query({
      query: () => `/users/me`,
      providesTags: ["User"],
    }),

    // Профіль за id (для сторінок інших користувачів)
    getUser: b.query({
      query: (id) => `/users/${id}`,
      providesTags: (_r, _e, id) => [{ type: "UserById", id }],
    }),

    // Якщо бек віддає окрему статистику (якщо ні — можна прибрати)
    getUserStats: b.query({
      query: (id) => `/users/${id}/stats`,
      providesTags: (_r, _e, id) => [{ type: "UserById", id }],
    }),

    uploadAvatar: b.mutation({
      query: ({ file }) => {
        const form = new FormData();
        form.append("avatar", file);
        return { url: `/users/me/avatar`, method: "PATCH", body: form };
      },
      invalidatesTags: ["User"],
    }),

    // Списки з серверною пагінацією
    getUserRecipes: b.query({
      query: ({ userId, page }) => `/users/${userId}/recipes?page=${page}`,
      providesTags: ["Recipes"],
    }),
    getUserFavorites: b.query({
      query: ({ userId, page }) => `/users/${userId}/favorites?page=${page}`,
      providesTags: ["Favorites"],
    }),
    getFollowers: b.query({
      query: ({ userId, page }) => `/users/${userId}/followers?page=${page}`,
      providesTags: ["Followers"],
    }),
    getFollowing: b.query({
      query: ({ userId, page }) => `/users/${userId}/following?page=${page}`,
      providesTags: ["Following"],
    }),

    // Follow / Unfollow з оптимістичними оновленнями і перерахунком лічильників
    followUser: b.mutation({
      query: ({ targetUserId }) => ({
        url: `/users/${targetUserId}/follow`,
        method: "POST",
      }),
      async onQueryStarted({ targetUserId }, { dispatch, queryFulfilled }) {
        const patchTarget = dispatch(
          api.util.updateQueryData("getUser", targetUserId, (draft) => {
            if (draft) {
              draft.followersCount = (draft.followersCount || 0) + 1;
              draft.isFollowedByMe = true;
            }
          })
        );
        const patchMe = dispatch(
          api.util.updateQueryData("getMe", undefined, (me) => {
            if (me) me.followingCount = (me.followingCount || 0) + 1;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchTarget.undo();
          patchMe.undo();
        }
      },
      invalidatesTags: ["Followers", "Following", "User", "UserById"],
    }),

    unfollowUser: b.mutation({
      query: ({ targetUserId }) => ({
        url: `/users/${targetUserId}/unfollow`,
        method: "DELETE",
      }),
      async onQueryStarted({ targetUserId }, { dispatch, queryFulfilled }) {
        const patchTarget = dispatch(
          api.util.updateQueryData("getUser", targetUserId, (draft) => {
            if (draft) {
              draft.followersCount = Math.max(
                0,
                (draft.followersCount || 0) - 1
              );
              draft.isFollowedByMe = false;
            }
          })
        );
        const patchMe = dispatch(
          api.util.updateQueryData("getMe", undefined, (me) => {
            if (me)
              me.followingCount = Math.max(0, (me.followingCount || 0) - 1);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchTarget.undo();
          patchMe.undo();
        }
      },
      invalidatesTags: ["Followers", "Following", "User", "UserById"],
    }),

    // Видалення рецептів
    deleteRecipe: b.mutation({
      query: ({ id }) => ({ url: `/recipes/${id}`, method: "DELETE" }),
      invalidatesTags: ["Recipes", "User"],
    }),
    deleteFromFavorites: b.mutation({
      query: ({ id }) => ({ url: `/favorites/${id}`, method: "DELETE" }),
      invalidatesTags: ["Favorites", "User"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetUserQuery,
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
