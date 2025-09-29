import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";

import PathInfo from "@/components/common/PathInfo/PathInfo";
import MainTitle from "@/components/common/Typography/MainTitle";
import Subtitle from "@/components/common/Typography/Subtitle";
import LogOutModal from "@/components/common/Modal/LogOutModal";

import UserInfo from "./UserInfo";
import TabsList from "./TabsList";
import ListItems from "./ListItems";

import { selectMe } from "@/redux/store";
import { useGetUserQuery, useGetUserStatsQuery } from "@/lib/api";

import "@/styles/profile.css";

const ALL_TABS = ["my", "favorites", "followers", "following"];

export default function UserPage() {
  const { id: routeId } = useParams();
  const me = useSelector(selectMe);
  const isSelf = Boolean(me?.id) && String(me.id) === String(routeId);

  // ===== URL state: tab + page =====
  const [sp, setSp] = useSearchParams();

  // дефолтная вкладка зависит от того, чей это профиль
  const initialTab = isSelf ? "my" : "followers";
  const rawTab = sp.get("tab") || initialTab;
  const activeTab = useMemo(
    () => (ALL_TABS.includes(rawTab) ? rawTab : initialTab),
    [rawTab, initialTab]
  );
  const page = Number(sp.get("page") || "1");

  // при смене статуса isSelf — поправить некорректные/пустые query-параметры
  useEffect(() => {
    const hasValidTab = sp.get("tab") && ALL_TABS.includes(sp.get("tab"));
    const hasPage = Boolean(sp.get("page"));
    if (!hasValidTab || !hasPage) {
      const next = new URLSearchParams(sp);
      if (!hasValidTab) next.set("tab", initialTab);
      if (!hasPage) next.set("page", "1");
      setSp(next, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelf]);

  // ===== Данные профиля (хуки вызываем безусловно, условия в skip) =====
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useGetUserQuery(routeId, { skip: !routeId });

  // stats может не существовать на бэке — это ок
  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError,
  } = useGetUserStatsQuery(routeId, { skip: !routeId });

  // ===== UI actions =====
  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleTabChange = (nextTab) => {
    const next = new URLSearchParams(sp);
    next.set("tab", nextTab);
    next.set("page", "1");
    setSp(next);
    document
      .getElementById("profile-content")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePageChange = (nextPage) => {
    const next = new URLSearchParams(sp);
    next.set("tab", activeTab);
    next.set("page", String(nextPage));
    setSp(next);
    document
      .getElementById("profile-content")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // «откат» на предыдущую страницу, если текущая опустела (вызывается из ListItems)
  const handleEmptyPage = () => {
    if (page > 1) {
      const next = new URLSearchParams(sp);
      next.set("tab", activeTab);
      next.set("page", String(page - 1));
      setSp(next, { replace: true });
    }
  };

  // ===== Состояния заголовка/левой колонки =====
  const headerIsLoading = userLoading || statsLoading;
  const headerHasError = userError || statsError;

  return (
    <div className="profile-page">
      <PathInfo title="Profile" />

      <MainTitle>PROFILE</MainTitle>
      <Subtitle>Personal area with your recipes and followers</Subtitle>

      <div className="profile-layout">
        {/* Левая колонка: информация профиля + LogOut (только для себя) */}
        <section className="profile-left" aria-live="polite">
          {headerIsLoading && <div className="empty-state">Loading...</div>}
          {headerHasError && !headerIsLoading && (
            <div className="empty-state">Failed to load profile</div>
          )}
          {!headerIsLoading && !headerHasError && (
            <UserInfo
              user={user}
              stats={stats}
              isSelf={isSelf}
              onLogout={() => setLogoutOpen(true)}
            />
          )}
        </section>

        {/* Правая колонка: вкладки + серверные списки + пагинация */}
        <section className="profile-right" id="profile-content" aria-live="polite">
          <TabsList
            active={activeTab}
            onChange={handleTabChange}
            showMyAndFav={isSelf} // скрыть "my/favorites" на чужом профиле
          />

          {/* ListItems сам делает запросы по активной вкладке и странице */}
          {!headerIsLoading && !headerHasError && (
            <ListItems
              activeTab={activeTab}
              userId={routeId}
              page={page}
              onPageChange={handlePageChange}
              onEmptyPage={handleEmptyPage}
            />
          )}
        </section>
      </div>

      {/* Модалка выхода — только на своём профиле */}
      {isSelf && (
        <LogOutModal open={logoutOpen} onClose={() => setLogoutOpen(false)} />
      )}
    </div>
  );
}
