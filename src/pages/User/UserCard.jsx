import { Link } from "react-router-dom";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "@/lib/api";

const FALLBACK = "/images/avatar-placeholder.png";

export default function UserCard({ user, context, onRemoved }) {
  const [follow,   { isLoading: l1 }] = useFollowUserMutation();
  const [unfollow, { isLoading: l2 }] = useUnfollowUserMutation();
  const pending = l1 || l2;

  const isFollowed = Boolean(user.isFollowedByMe);

  const toggleFollow = async () => {
    if (isFollowed) {
      await unfollow({ targetUserId: user.id }).unwrap();
      if (context === "following" && onRemoved) {
        onRemoved(user.id);
      }
    } else {
      await follow({ targetUserId: user.id }).unwrap();
    }
  };

  return (
    <div className="user-row">
      <img
        className="user-avatar"
        src={user.avatarUrl || FALLBACK}
        alt={`${user.name} avatar`}
      />

      <div>
        <div className="user-name">{user.name}</div>
        <div className="user-meta">
          Recipes: {user.recipesCount ?? 0}
          {typeof user.followersCount === "number" && (
            <> · Followers: {user.followersCount}</>
          )}
        </div>
      </div>

      <div className="user-actions">
        <Link
          className="icon-btn"
          to={`/user/${user.id}`}
          aria-label={`Open ${user.name}'s profile`}
        >
          ➡️
        </Link>
        <button
          className="btn"
          onClick={toggleFollow}
          disabled={pending}
          aria-pressed={isFollowed}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </button>
      </div>
    </div>
  );
}
