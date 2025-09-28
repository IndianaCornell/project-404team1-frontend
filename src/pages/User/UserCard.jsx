import { Link } from "react-router-dom";
import { useFollowUserMutation, useUnfollowUserMutation } from "@/lib/api";
import { useState } from "react";

const defaultAvatar = "/images/default-avatar.png";

export default function UserCard({ user, context }) {
  const [isFollowing, setIsFollowing] = useState(!!user.meta?.isFollowing || !!user.isFollowing);
  const [follow]   = useFollowUserMutation();
  const [unfollow] = useUnfollowUserMutation();
  const [pending, setPending] = useState(false);

  const toggle = async () => {
    setPending(true);
    const next = !isFollowing;
    setIsFollowing(next);
    try {
      if (next) await follow(user.id).unwrap();
      else      await unfollow(user.id).unwrap();
    } catch {
      setIsFollowing(!next);
    } finally {
      setPending(false);
    }
  };

  return (
    <article className="p-3 border rounded-lg bg-white flex flex-col gap-2">
      <div className="flex gap-3 items-center">
        <img src={user.avatarUrl ?? defaultAvatar} alt={user.name} className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-sm text-gray-600">Recipes: {user.recipesCount ?? 0}</p>
          {user.lastRecipes?.length ? (
            <ul className="hidden md:list-disc md:ml-5 md:block text-sm">
              {user.lastRecipes.map((r) => <li key={r.id}>{r.title}</li>)}
            </ul>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <Link to={`/user/${user.id}`} aria-label="Open user" className="text-gray-600 hover:text-black">→</Link>
          <button
            type="button"
            onClick={toggle}
            disabled={pending}
            className="px-3 py-1 rounded bg-black text-white hover:opacity-90 disabled:opacity-60"
          >
            {pending ? "…" : isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>
      </div>
    </article>
  );
}
