import { useEffect } from "react";
import {
  useGetUserRecipesQuery,
  useGetUserFavoritesQuery,
  useGetFollowersQuery,
  useGetFollowingQuery,
} from "@/lib/api";
import RecipePreview from "./RecipePreview";
import UserCard from "./UserCard";
import ListPagination from "./ListPagination";

function EmptyState({ tab }) {
  const map = {
    my: "No recipes yet.",
    favorites: "No favorites yet.",
    followers: "No followers yet.",
    following: "You are not following anyone yet.",
  };
  return <p className="text-center text-gray-500 py-8">{map[tab] || "No data."}</p>;
}

export default function ListItems({
  activeTab,
  userId,
  page,
  onPageChange,
  onEmptyPage,
}) {
  const limit = 12;

  const recipesQ =
    activeTab === "my"
      ? useGetUserRecipesQuery({ userId, page, limit })
      : undefined;

  const favQ =
    activeTab === "favorites"
      ? useGetUserFavoritesQuery({ userId, page, limit })
      : undefined;

  const followersQ =
    activeTab === "followers"
      ? useGetFollowersQuery({ userId, page, limit })
      : undefined;

  const followingQ =
    activeTab === "following"
      ? useGetFollowingQuery({ userId, page, limit })
      : undefined;

  const data =
    recipesQ?.data ||
    favQ?.data ||
    followersQ?.data ||
    followingQ?.data ||
    { items: [], total: 0, page, perPage: limit };

  const items = data.items || [];
  const total = data.total || 0;
  const perPage = data.perPage || limit;

  useEffect(() => {
    if (items.length === 0 && page > 1) onEmptyPage?.();
  }, [items.length, page]);

  return (
    <div className="mt-4">
      {items.length === 0 ? (
        <EmptyState tab={activeTab} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeTab === "my" || activeTab === "favorites"
            ? items.map((r) => (
                <RecipePreview key={r.id} item={r} userId={userId} tabKey={activeTab} />
              ))
            : items.map((u) => <UserCard key={u.id} user={u} context={activeTab} />)}
        </div>
      )}

      <ListPagination
        page={page}
        perPage={perPage}
        total={total}
        onPageChange={onPageChange}
      />
    </div>
  );
}
