import { Link } from "react-router-dom";
import Button from "../../components/ui/Button.jsx";
import Icon from "../../components/ui/Icon.jsx";
import { useFollowUserMutation, useUnfollowUserMutation } from "../../lib/api";
import { useState } from "react";

const defaultAvatar = "/images/default-avatar.png";

export default function UserCard({ user, context }) {
  const [isFollowing, setIsFollowing] = useState(!!user.meta?.isFollowing);
  const [follow] = useFollowUserMutation();
  const [unfollow] = useUnfollowUserMutation();
  const [pending, setPending] = useState(false);

  const toggle = async () => {
    try {
      setPending(true);
      if (isFollowing) {
        await unfollow(user.id).unwrap();
        setIsFollowing(false);
      } else {
        await follow(user.id).unwrap();
        setIsFollowing(true);
      }
    } catch (_) {
      // TODO: handle error (toast, alert)
    } finally {
      setPending(false);
    }
  };

  // Если это вкладка Following и юзер отписался — скрываем карточку сразу
  if (context === "following" && !isFollowing) return null;

  return (
    <article className="user-card flex items-center gap-3 border rounded p-3 bg-white">
      <img
        src={user.avatarUrl || defaultAvatar}
        alt={user.name}
        className="avatar-sm w-12 h-12 rounded-full object-cover"
      />
      <div className="info flex-1">
        <h4 className="font-semibold">{user.name}</h4>
        <p className="text-sm text-gray-500">
          Recipes: {user.stats?.recipes ?? 0}
        </p>
        <div className="recent hidden md:flex gap-1 flex-wrap mt-1">
          {(user.recentRecipes || []).slice(0, 3).map((r) => (
            <span key={r.id} className="pill bg-gray-100 text-xs px-2 py-1 rounded">
              {r.title}
            </span>
          ))}
        </div>
      </div>
      <div className="actions flex items-center gap-2">
        <Link
          to={`/user/${user.id}`}
          className="icon-link text-gray-500 hover:text-black"
          aria-label="Open user"
        >
          <Icon name="arrow-right" />
        </Link>
        <Button onClick={toggle} disabled={pending}>
          {pending ? "..." : isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </div>
    </article>
  );
}
