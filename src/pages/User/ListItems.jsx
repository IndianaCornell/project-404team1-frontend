// src/pages/User/ListItems.jsx
import RecipePreview from "@/pages/User/RecipePreview";
import UserCard from "@/pages/User/UserCard";
import ListPagination from "@/pages/User/ListPagination";

import {
  useGetUserRecipesQuery,
  useGetUserFavoritesQuery,
  useGetFollowersQuery,
  useGetFollowingQuery,
} from "@/lib/api";

function EmptyState({ text }) {
  return <div className="empty-state">{text}</div>;
}

export default function ListItems({
  activeTab,        // "my" | "favorites" | "followers" | "following"
  userId,
  page,
  onPageChange,
  onEmptyPage,      // вызвать, когда текущая страница опустела (page > 1)
}) {
  // === Никаких ранних return до хуков ===
  const isBaseMissing = !userId || !page;

  // Вызываем ВСЕ хуки стабильно; управляем через skip
  const qMy = useGetUserRecipesQuery(
    { userId, page },
    { skip: isBaseMissing || activeTab !== "my" }
  );
  const qFav = useGetUserFavoritesQuery(
    { userId, page },
    { skip: isBaseMissing || activeTab !== "favorites" }
  );
  const qFollowers = useGetFollowersQuery(
    { userId, page },
    { skip: isBaseMissing || activeTab !== "followers" }
  );
  const qFollowing = useGetFollowingQuery(
    { userId, page },
    { skip: isBaseMissing || activeTab !== "following" }
  );

  // Текущий источник данных
  const current =
    activeTab === "my"
      ? qMy
      : activeTab === "favorites"
      ? qFav
      : activeTab === "followers"
      ? qFollowers
      : qFollowing;

  // Тексты пустых состояний
  const emptyText =
    activeTab === "my"
      ? "You haven't added any recipes yet"
      : activeTab === "favorites"
      ? "No favorite recipes yet"
      : activeTab === "followers"
      ? "No followers yet"
      : "You are not following anyone yet";

  // Загрузка/инициализация/ошибка
  if (isBaseMissing || current.isUninitialized || (current.isFetching && !current.data)) {
    return <EmptyState text="Loading..." />;
  }
  if (current.isError) return <EmptyState text="Something went wrong" />;

  // Данные
  const data = current.data ?? { items: [], total: 0, limit: 12 };
  const items = Array.isArray(data.items) ? data.items : [];
  const total = Number(data.total ?? 0);
  const rawLimit = Number(data.limit ?? (items.length || 1));
  const limit = Math.max(1, rawLimit);
  const totalPages = Math.max(1, Math.ceil(total / limit));

  // Пустая страница → шаг назад
  if (items.length === 0) {
    if (page > 1 && typeof onEmptyPage === "function") {
      onEmptyPage();
      return null;
    }
    return <EmptyState text={emptyText} />;
  }

  return (
    <div className="list-section">
      <div className="list-stack">
        {(activeTab === "my" || activeTab === "favorites") &&
          items.map((recipe) => (
            <RecipePreview
              key={recipe.id}
              item={recipe}
              tabKey={activeTab === "my" ? "my" : "favorites"}
            />
          ))}

        {(activeTab === "followers" || activeTab === "following") &&
          items.map((u) => <UserCard key={u.id} user={u} />)}
      </div>

      {totalPages > 1 && (
        <ListPagination page={page} pages={totalPages} onPage={onPageChange} />
      )}
    </div>
  );
}
