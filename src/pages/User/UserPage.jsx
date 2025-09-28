import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";

import PathInfo from "@/components/common/PathInfo/PathInfo";
import LogOutModal from "@/components/common/Modal/LogOutModal";

import UserInfo from "@/pages/User/UserInfo";
import TabsList from "@/pages/User/TabsList";
import ListItems from "@/pages/User/ListItems";

import { selectMe } from "@/redux/store";
import { useGetUserProfileQuery, useGetUserStatsQuery } from "@/lib/api";

import "@/styles/profile.css";

const TABS = ["my", "favorites", "followers", "following"];
const DEFAULT_TAB = "my";

export default function UserPage() {
  const { id } = useParams();
  const me = useSelector(selectMe);
  const isSelf = me && String(me.id) === String(id);

  const [sp, setSp] = useSearchParams();
  const activeTabFromUrl = sp.get("tab") || DEFAULT_TAB;
  const activeTab = useMemo(
    () => (TABS.includes(activeTabFromUrl) ? activeTabFromUrl : DEFAULT_TAB),
    [activeTabFromUrl]
  );
  const page = Number(sp.get("page") || 1);

  // если в URL прилетел левый tab — аккуратно правим его
  useEffect(() => {
    if (!TABS.includes(activeTabFromUrl)) {
      setSp({ tab: DEFAULT_TAB, page: "1" }, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTabFromUrl]);

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useGetUserProfileQuery(id, { skip: !id });

  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError,
  } = useGetUserStatsQuery(id, { skip: !id });

  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleTabChange = (nextTab) => {
    setSp({ tab: nextTab, page: "1" });
    // скроллим к началу правой колонки
    document.getElementById("profile-content")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePageChange = (nextPage) => {
    setSp({ tab: activeTab, page: String(nextPage) });
    document.getElementById("profile-content")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleEmptyPage = () => {
    if (page > 1) setSp({ tab: activeTab, page: String(page - 1) });
  };

  // простые состояния загрузки/ошибки заголовка и карточки профиля
  const headerIsLoading = userLoading || statsLoading;
  const headerHasError = userError || statsError;

  return (
    <div className="profile-page">
      <PathInfo title="Profile" />

      <h1 className="profile-title">PROFILE</h1>
      <p className="profile-sub">Personal area with your recipes and followers</p>

      <div className="profile-layout">
        {/* Левая колонка: инфо + LogOut */}
        <UserInfo
          user={user}
          stats={stats}
          isSelf={isSelf}
          onLogout={() => setLogoutOpen(true)}
        />

        {/* Правая колонка: вкладки + списки */}
        <section className="profile-right" id="profile-content" aria-live="polite">
          <TabsList active={activeTab} onChange={handleTabChange} />

          {headerIsLoading && <div className="empty-state">Loading...</div>}
          {headerHasError && !headerIsLoading && (
            <div className="empty-state">Failed to load profile</div>
          )}

          {!headerIsLoading && !headerHasError && (
            <ListItems
              activeTab={activeTab}
              userId={id}
              page={page}
              onPageChange={handlePageChange}
              onEmptyPage={handleEmptyPage}
            />
          )}
        </section>
      </div>

      <LogOutModal open={logoutOpen} onClose={() => setLogoutOpen(false)} />
    </div>
  );
}
