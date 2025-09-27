import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";

import PathInfo from "@/components/common/PathInfo/PathInfo";
import MainTitle from "@/components/common/Typography/MainTitle";
import Subtitle from "@/components/common/Typography/Subtitle";
import LogOutModal from "@/components/common/Modal/LogOutModal";

import UserInfo from "@/pages/User/UserInfo";
import TabsList from "@/pages/User/TabsList";
import ListItems from "@/pages/User/ListItems";

import { selectMe } from "@/redux/store";
import { useGetUserProfileQuery, useGetUserStatsQuery } from "@/lib/api";

const DEFAULT_TAB = "my";

export default function UserPage() {
  const { id } = useParams();             // чий профіль дивимось
  const me = useSelector(selectMe);
  const isSelf = me && String(me.id) === String(id);

  const [sp, setSp] = useSearchParams();
  const activeTab = sp.get("tab") || DEFAULT_TAB;
  const page = Number(sp.get("page") || 1);

  const { data: user } = useGetUserProfileQuery(id);
  const { data: stats } = useGetUserStatsQuery(id);

  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleTabChange = (nextTab) => setSp({ tab: nextTab, page: "1" });
  const handlePageChange = (nextPage) =>
    setSp({ tab: activeTab, page: String(nextPage) });
  const handleEmptyPage = () => {
    if (page > 1) setSp({ tab: activeTab, page: String(page - 1) });
  };

  return (
    <div className="container mx-auto p-4">
      <PathInfo title="User" />

      <div className="flex items-baseline justify-between">
        <div>
          <MainTitle>{user?.name ?? "User"}</MainTitle>
          <Subtitle>@{user?.username ?? id}</Subtitle>
        </div>

        {isSelf && (
          <button
            type="button"
            className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200"
            onClick={() => setLogoutOpen(true)}
          >
            Log Out
          </button>
        )}
      </div>

      <UserInfo user={user} stats={stats} isSelf={isSelf} />

      <TabsList active={activeTab} onChange={handleTabChange} />

      <ListItems
        activeTab={activeTab}
        userId={id}
        page={page}
        onPageChange={handlePageChange}
        onEmptyPage={handleEmptyPage}
      />

      <LogOutModal open={logoutOpen} onClose={() => setLogoutOpen(false)} />
    </div>
  );
}
