// src/pages/User/UserCard.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useFollowUserMutation, useUnfollowUserMutation } from "@/lib/api";

const fallbackAvatar = "/images/placeholder-avatar.png";
const fallbackThumb  = "/images/placeholder-recipe.png";

export default function UserCard({ user }) {
  const u = user ?? {};
  const id     = u.id ?? null;
  const name   = (u.name || "User").toUpperCase();
  const email  = u.email || "";
  const avatar = u.avatar || fallbackAvatar;
  const ownRecipes = Number(u.ownRecipes ?? u.counts?.created ?? 0);

  const thumbs = useMemo(() => {
    const arr = Array.isArray(u.last4) ? u.last4 : [];
    return arr.slice(0, 4);
  }, [u.last4]);

  const initiallyFollowed =
    typeof u.isFollowed === "boolean" ? u.isFollowed : false;

  const [isFollowed, setIsFollowed] = useState(initiallyFollowed);

  const [followUser,   { isLoading: followPending }] = useFollowUserMutation();
  const [unfollowUser, { isLoading: unfollowPending }] = useUnfollowUserMutation();

  const pending = followPending || unfollowPending;

  const handleToggleFollow = async () => {
    if (!id || pending) return;
    const prev = isFollowed;
    setIsFollowed(!prev); // optimistic
    try {
      if (prev) await unfollowUser(id).unwrap();
      else      await followUser(id).unwrap();
    } catch {
      setIsFollowed(prev); // rollback
    }
  };

  // Можно показать скелет/заглушку, НО уже после хуков (правило hooks соблюдено)
  if (!id) {
    return (
      <>
        <div className="follower-row" aria-busy="true">
          <div className="follower-avatar" />
          <div>
            <div className="follower-name">USER</div>
            <div className="follower-own">Own recipes: 0</div>
            <button className="follower-follow" disabled>FOLLOW</button>
          </div>
          <div className="follower-previews">
            {Array.from({ length: 4 }).map((_, i) => (
              <img key={i} src={fallbackThumb} alt="" />
            ))}
          </div>
          <button className="follower-link" disabled>↗</button>
        </div>
        <div className="divider" />
      </>
    );
  }

  return (
    <>
      <div className="follower-row" aria-busy={pending}>
        <img className="follower-avatar" src={avatar} alt={name} />

        <div>
          <div className="follower-name">{name}</div>
          {email && <div className="follower-own">{email}</div>}
          <div className="follower-own">Own recipes: {ownRecipes}</div>

          <button
            type="button"
            className="follower-follow"
            onClick={handleToggleFollow}
            disabled={pending}
            aria-pressed={isFollowed}
            aria-label={isFollowed ? "Unfollow user" : "Follow user"}
            title={isFollowed ? "Unfollow" : "Follow"}
          >
            {isFollowed ? "UNFOLLOW" : "FOLLOW"}
          </button>
        </div>

        <div className="follower-previews">
          {(thumbs.length ? thumbs : Array(4).fill(null)).map((src, i) => (
            <img key={i} src={src || fallbackThumb} alt="" />
          ))}
        </div>

        <Link
          to={`/user/${id}`}
          className="follower-link"
          aria-label="Open profile"
          title="Open profile"
        >
          ↗
        </Link>
      </div>

      <div className="divider" />
    </>
  );
}
