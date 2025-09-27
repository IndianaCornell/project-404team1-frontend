import { useState } from "react";
import {
  useUploadAvatarMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "@/lib/api";

const defaultAvatar = "/images/default-avatar.png";

export default function UserInfo({ user, stats, isSelf }) {
  const [preview, setPreview] = useState(null);
  const [uploadAvatar, { isLoading: avatarPending }] = useUploadAvatarMutation();
  const [follow] = useFollowUserMutation();
  const [unfollow] = useUnfollowUserMutation();
  const [isFollowing, setIsFollowing] = useState(!!user?.isFollowing);

  const onFile = async (e) => {
    const f = e.target.files?.[0];
    if (!f || !user?.id) return;
    setPreview(URL.createObjectURL(f));
    try {
      await uploadAvatar({ userId: user.id, file: f }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFollow = async () => {
    if (!user?.id || isSelf) return;
    const next = !isFollowing;
    setIsFollowing(next);
    try {
      if (next) await follow(user.id).unwrap();
      else await unfollow(user.id).unwrap();
    } catch {
      setIsFollowing(!next);
    }
  };

  return (
    <section className="mt-4 p-4 border rounded-xl bg-white">
      <div className="flex gap-4 items-center">
        <img
          src={preview ?? user?.avatarUrl ?? defaultAvatar}
          alt="avatar"
          className="w-20 h-20 rounded-full object-cover border"
        />

        <div className="flex-1">
          <div className="text-sm text-gray-600">Email: {user?.email ?? "—"}</div>
          <ul className="flex gap-4 mt-2 text-sm">
            <li>Recipes: {stats?.recipesCount ?? 0}</li>
            <li>Favorites: {stats?.favoritesCount ?? 0}</li>
            <li>Followers: {stats?.followersCount ?? 0}</li>
            <li>Following: {stats?.followingCount ?? 0}</li>
          </ul>
        </div>

        {isSelf ? (
          <label className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer">
            {avatarPending ? "Uploading..." : "Upload avatar"}
            <input type="file" hidden accept="image/*" onChange={onFile} />
          </label>
        ) : (
          <button
            type="button"
            className="px-3 py-2 rounded bg-gray-900 text-white hover:bg-black"
            onClick={toggleFollow}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>
    </section>
  );
}
