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
  tagTypes: ["User", "Recipes", "Followers", "Following"],
  endpoints: (build) => ({
    getUserProfile: build.query({
      query: (userId) => `/users/${userId}`,
      providesTags: (r, e, id) => [{ type: "User", id }],
    }),

    uploadAvatar: build.mutation({
      query: ({ userId, file }) => {
        const formData = new FormData();
        formData.append("avatar", file);
        return {
          url: `/users/${userId}/avatar`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (r, e, { userId }) => [{ type: "User", id: userId }],
    }),

    followUser: build.mutation({
      query: (userId) => ({ url: `/follows/${userId}`, method: "POST" }),
      invalidatesTags: (r, e, userId) => [
        { type: "User", id: userId },
        { type: "Followers", id: userId },
        { type: "Following", id: "me" },
      ],
    }),

    unfollowUser: build.mutation({
      query: (userId) => ({ url: `/follows/${userId}`, method: "DELETE" }),
      invalidatesTags: (r, e, userId) => [
        { type: "User", id: userId },
        { type: "Followers", id: userId },
        { type: "Following", id: "me" },
      ],
    }),

    getUserRecipes: build.query({
      query: ({ userId, page = 1, limit = 12, tab = "own" }) =>
        `/users/${userId}/recipes?tab=${tab}&page=${page}&limit=${limit}`,
      providesTags: (r, e, { userId, tab }) => [
        { type: "Recipes", id: `${userId}-${tab}` },
      ],
    }),

    deleteRecipe: build.mutation({
      query: ({ recipeId, userId, tab }) => ({
        url:
          tab === "favorites"
            ? `/favorites/${recipeId}`
            : `/recipes/${recipeId}`,
        method: "DELETE",
      }),
      invalidatesTags: (r, e, { userId, tab }) => [
        { type: "Recipes", id: `${userId}-${tab}` },
        { type: "User", id: userId },
      ],
    }),

    getFollowers: build.query({
      query: ({ userId, page = 1, limit = 12 }) =>
        `/users/${userId}/followers?page=${page}&limit=${limit}`,
      providesTags: (r, e, { userId }) => [{ type: "Followers", id: userId }],
    }),

    getFollowing: build.query({
      query: ({ userId, page = 1, limit = 12 }) =>
        `/users/${userId}/following?page=${page}&limit=${limit}`,
      providesTags: (r, e, { userId }) => [{ type: "Following", id: userId }],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUploadAvatarMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetUserRecipesQuery,
  useDeleteRecipeMutation,
  useGetFollowersQuery,
  useGetFollowingQuery,
} = api;
