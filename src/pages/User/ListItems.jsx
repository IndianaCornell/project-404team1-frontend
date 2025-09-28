import { useEffect, useMemo } from "react";
import {
  useGetUserRecipesQuery,
  useGetUserFavoritesQuery,
  useGetFollowersQuery,
  useGetFollowingQuery,
} from "@/lib/api";
import RecipePreview from "./RecipePreview";
import UserCard from "./UserCard";
import Pagination from "@/components/common/Pagination/Pagination.jsx";

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
  activeTab,     // 'my' | 'favorites' | 'followers' | 'following'
  userId,
  page,
  onPageChange,
  onEmptyPage,
}) {
  const limit = 12;

  const isMy        = activeTab === "my";
  const isFav       = activeTab === "favorites";
  const isFollowers = activeTab === "followers";
  const isFollowing = activeTab === "following";

  // ❗️Хуки всегда вызываются, но с флагом skip
  const recipesQ   = useGetUserRecipesQuery(
    { userId, page, limit },
    { skip: !isMy }
  );

  const favQ       = useGetUserFavoritesQuery(
    { userId, page, limit },
    { skip: !isFav }
  );

  const followersQ = useGetFollowersQuery(
    { userId, page, limit },
    { skip: !isFollowers }
  );

  const followingQ = useGetFollowingQuery(
    { userId, page, limit },
    { skip: !isFollowing }
  );

  // Берём активный источник данных
  const data = isMy
    ? recipesQ.data
    : isFav
    ? favQ.data
    : isFollowers
    ? followersQ.data
    : isFollowing
    ? followingQ.data
    : undefined;

  const items = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    return data.items || data.results || [];
  }, [data]);

  const { total, perPage } = useMemo(() => {
    const total =
      (data && (data.total ?? data.count)) ??
      (data && data.totalPages && (data.totalPages * (data.perPage || limit))) ??
      0;

    const perPage = (data && (data.perPage ?? data.limit)) ?? limit;
    return { total, perPage };
  }, [data]);

  const totalPages = Math.max(1, Math.ceil((total || 0) / (perPage || limit)));

  // Если после удаления страница опустела — шаг назад
  useEffect(() => {
    if (items.length === 0 && page > 1) onEmptyPage?.();
  }, [items.length, page, onEmptyPage]);

  return (
    <div className="mt-4">
      {items.length === 0 ? (
        <EmptyState tab={activeTab} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {isMy || isFav
            ? items.map((r) => (
                <RecipePreview key={r.id} item={r} tabKey={activeTab} />
              ))
            : items.map((u) => (
                <UserCard key={u.id} user={u} context={activeTab} />
              ))}
        </div>
      )}

      <Pagination
        page={page}
        pagesCount={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
