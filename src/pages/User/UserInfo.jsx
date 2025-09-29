import { useState } from "react";
import {
  useUploadAvatarMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "@/lib/api";

const FALLBACK = "/images/avatar-placeholder.png";

export default function UserInfo({ user, stats, isSelf, onLogout }) {
  const [uploadAvatar] = useUploadAvatarMutation();
  const [follow,   { isLoading: f1 }] = useFollowUserMutation();
  const [unfollow, { isLoading: f2 }] = useUnfollowUserMutation();
  const [busy, setBusy] = useState(false);

  if (!user) return null;

  // Счётчики: берем из stats → из user → 0
  const counters = {
    recipes:   stats?.recipesCount   ?? user.recipesCount   ?? 0,
    favorites: stats?.favoritesCount ?? user.favoritesCount ?? 0,
    followers: stats?.followersCount ?? user.followersCount ?? 0,
    following: stats?.followingCount ?? user.followingCount ?? 0,
  };

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setBusy(true);
      await uploadAvatar({ file }).unwrap();
    } finally {
      setBusy(false);
    }
  };

  const isFollowed = Boolean(user.isFollowedByMe);
  const pendingFollow = f1 || f2;

  const toggleFollow = async () => {
    if (isFollowed) {
      await unfollow({ targetUserId: user.id }).unwrap();
    } else {
      await follow({ targetUserId: user.id }).unwrap();
    }
  };

  return (
    <aside className="profile-card" aria-label="User summary">
      <img
        className="avatar"
        src={user.avatarUrl || FALLBACK}
        alt={`${user.name || "User"} avatar`}
      />

      <div className="name">{user.name || "User"}</div>
      {user.email && <div className="email">{user.email}</div>}

      {/* upload только в своём профиле */}
      {isSelf && (
        <label style={{ display: "block", textAlign: "center", marginBottom: 12 }}>
          <input
            type="file"
            accept="image/*"
            onChange={onFile}
            disabled={busy}
            aria-label="Upload avatar"
          />
        </label>
      )}

      <div className="stats" role="list" aria-label="User stats">
        <div className="stat" role="listitem"><span>Recipes</span><strong>{counters.recipes}</strong></div>
        <div className="stat" role="listitem"><span>Favorites</span><strong>{counters.favorites}</strong></div>
        <div className="stat" role="listitem"><span>Followers</span><strong>{counters.followers}</strong></div>
        <div className="stat" role="listitem"><span>Following</span><strong>{counters.following}</strong></div>
      </div>

      {/* Кнопка действия: Log Out для себя / Follow для чужого */}
      {isSelf ? (
        <button className="logout" onClick={onLogout}>LOG OUT</button>
      ) : (
        <button
          className="logout"
          onClick={toggleFollow}
          disabled={pendingFollow}
          aria-pressed={isFollowed}
        >
          {isFollowed ? "UNFOLLOW" : "FOLLOW"}
        </button>
      )}
    </aside>
  );
}
