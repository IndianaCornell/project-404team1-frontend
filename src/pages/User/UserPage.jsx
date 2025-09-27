import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// корректные пути под твою структуру
import PathInfo from "@/components/common/PathInfo/PathInfo";
import MainTitle from "@/components/common/Typography/MainTitle";
import Subtitle from "@/components/common/Typography/Subtitle";
import LogOutModal from "@/components/common/Modal/LogOutModal";

import UserInfo from "@/pages/User/UserInfo";
import TabsList from "@/pages/User/TabsList";
import ListItems from "@/pages/User/ListItems";

import { selectMe } from "@/redux/store";           
import { useGetUserProfileQuery } from "@/lib/api";

// Локальный FollowButton, чтобы не создавать отдельный модуль
import { useFollowUserMutation, useUnfollowUserMutation } from "@/lib/api";

function FollowButton({ profileUser }) {
  const [follow,   { isLoading: followPending }]   = useFollowUserMutation();
  const [unfollow, { isLoading: unfollowPending }] = useUnfollowUserMutation();
  const isFollowed = !!profileUser?.meta?.isFollowing;

  const toggle = async () => {
    if (isFollowed) await unfollow(profileUser.id).unwrap();
    else await follow(profileUser.id).unwrap();
  };

  return (
    <button
      className={`px-4 py-2 rounded ${
        isFollowed ? "bg-gray-100 hover:bg-gray-200" : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
      disabled={followPending || unfollowPending}
      onClick={toggle}
    >
      {isFollowed ? "Unfollow" : "Follow"}
    </button>
  );
}

export default function UserPage() {
  const { id: idParam } = useParams();
  const id = idParam; // если uuid — оставляем строкой

  const { data: user, isLoading, isError, refetch } = useGetUserProfileQuery(id);

  const me = useSelector(selectMe);
  const isOwn = useMemo(() => me?.id && user?.id && me.id === user.id, [me, user]);

  const [logoutOpen, setLogoutOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(isOwn ? "my" : "favorites");

  if (isLoading) return <div className="p-6">Loading…</div>;

  if (isError || !user) {
    return (
      <div className="p-6">
        <PathInfo title="User" />
        <MainTitle>User</MainTitle>
        <Subtitle>Not found or failed to load.</Subtitle>
        <button className="px-3 py-2 rounded bg-gray-200" onClick={refetch}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <PathInfo title={`User: ${user.name}`} />

      <div className="flex items-center justify-between">
        <div>
          <MainTitle>User profile</MainTitle>
          <Subtitle>Overview and activity</Subtitle>
        </div>
        <div className="flex gap-2">
          {isOwn ? (
            <button
              className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
              onClick={() => setLogoutOpen(true)}
            >
              Log Out
            </button>
          ) : (
            <FollowButton profileUser={user} />
          )}
        </div>
      </div>

      {/* UserInfo у тебя уже есть в pages/User/UserInfo.jsx */}
      <UserInfo user={user} />

      <TabsList active={activeTab} onChange={setActiveTab} />

      <ListItems activeTab={activeTab} userId={user.id} />

      <LogOutModal open={logoutOpen} onClose={() => setLogoutOpen(false)} />
    </div>
  );
}
