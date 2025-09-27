import { useEffect, useMemo, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  useGetUserRecipesQuery,
  useGetFollowersQuery,
  useGetFollowingQuery,
} from "@/lib/api";
import RecipePreview from "./RecipePreview";
import UserCard from "./UserCard";
import ListPagination from "./ListPagination"; 

export default function ListItems({ activeTab, userId }) {
  const [page, setPage] = useState(1);

  // Сбрасываем страницу при смене вкладки/пользователя
  useEffect(() => {
    setPage(1);
  }, [activeTab, userId]);

  const isMy = activeTab === "my";
  const isFav = activeTab === "favorites";
  const isFollowers = activeTab === "followers";
  const isFollowing = activeTab === "following";

  // Рецепты (один эндпоинт с tab: 'own' | 'favorites')
  const {
    data: recipesData,
    isLoading: recipesLoading,
    isError: recipesError,
  } = useGetUserRecipesQuery(
    isMy || isFav ? { userId, page, tab: isMy ? "own" : "favorites" } : skipToken
  );

  // Соц-списки
  const {
    data: followersData,
    isLoading: followersLoading,
    isError: followersError,
  } = useGetFollowersQuery(isFollowers ? { userId, page } : skipToken);

  const {
    data: followingData,
    isLoading: followingLoading,
    isError: followingError,
  } = useGetFollowingQuery(isFollowing ? { userId, page } : skipToken);

  // Выбираем активный источник данных
  const { data, isLoading, isError } = useMemo(() => {
    if (isMy || isFav) return { data: recipesData, isLoading: recipesLoading, isError: recipesError };
    if (isFollowers)  return { data: followersData, isLoading: followersLoading, isError: followersError };
    if (isFollowing)  return { data: followingData, isLoading: followingLoading, isError: followingError };
    return { data: null, isLoading: false, isError: false };
  }, [
    isMy, isFav, isFollowers, isFollowing,
    recipesData, recipesLoading, recipesError,
    followersData, followersLoading, followersError,
    followingData, followingLoading, followingError,
  ]);

  // Если после удаления страница опустела — вернуться на предыдущую
  useEffect(() => {
    if (!data) return;
    const items = data.items ?? [];
    if (page > 1 && items.length === 0) {
      setPage((p) => Math.max(1, p - 1));
    }
  }, [data, page]);

  if (isLoading) return <div className="p-4">Loading…</div>;
  if (isError)   return <div className="p-4 text-red-500">Failed to load.</div>;
  if (!data || !data.items?.length) return <div className="p-4 text-gray-500">No items yet.</div>;

  return (
    <div className="mt-4 space-y-4">
      {(isMy || isFav)
        ? data.items.map((r) => (
            <RecipePreview key={r.id} item={r} userId={userId} tabKey={activeTab} />
          ))
        : data.items.map((u) => (
            <UserCard key={u.id} user={u} context={activeTab} />
          ))}

      <ListPagination
        page={data.page ?? page}
        perPage={data.perPage ?? 12}
        total={data.total ?? 0}
        onPageChange={setPage}
      />
    </div>
  );
}
