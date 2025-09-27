import { useDispatch } from "react-redux";
import {
  useGetUserProfileQuery,
  useUploadAvatarMutation,
  useFollowUserMutation,
  useUnfollowUserMutation
} from "../../lib/api";
import Button from "../../components/ui/Button.jsx";
import Modal from "../../components/common/Modal/Modal.jsx";
import { useState, useRef } from "react";
import { logOut } from "../../redux/store";
// import { useNavigate } from "react-router-dom"; // если хотите редирект после логаута

const defaultAvatar = "/images/default-avatar.png"; // положите в public или assets

export default function UserInfo({ userId, isSelf }) {
  const { data: user, isLoading, isError, refetch } = useGetUserProfileQuery(userId);
  const [uploadAvatar, { isLoading: avatarLoading }] = useUploadAvatarMutation();
  const [follow,   { isLoading: followPending }]   = useFollowUserMutation();
  const [unfollow, { isLoading: unfollowPending }] = useUnfollowUserMutation();

  // const navigate = useNavigate();
  // const authUser = useSelector((s) => s.auth.user); // не используется — можно удалить
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  if (isLoading) return <div>Loading...</div>;
  if (isError)   return <div>Error. <button onClick={refetch}>Retry</button></div>;
  if (!user)     return null;

  const isFollowing = !!user?.meta?.isFollowing;

  const handleAvatarClick = () => inputRef.current?.click();

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await uploadAvatar({ userId, file }).unwrap();
    } catch (_) {
      // можно показать тост/ошибку
    } finally {
      // чтобы можно было выбрать тот же файл повторно
      e.target.value = "";
    }
  };

  const [pending, setPending] = useState(false);
  const toggleFollow = async () => {
    try {
      setPending(true);
      if (isFollowing) {
        await unfollow(userId).unwrap();   // <-- фикс: передаём userId
      } else {
        await follow(userId).unwrap();
      }
    } catch (_) {
      // тост/ошибка
    } finally {
      setPending(false);
    }
  };

  const onConfirmLogout = () => {
    setOpen(false);
    dispatch(logOut());
    // navigate("/login"); // если нужен редирект
  };

  return (
    <section className="user-info">
      <div className="user-left">
        <img
          src={user.avatarUrl || defaultAvatar}
          alt={user.name}
          className="avatar"
          width="96"
          height="96"
          onClick={isSelf ? handleAvatarClick : undefined}
          style={{ cursor: isSelf ? "pointer" : "default" }}
        />
        {isSelf && (
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            style={{ display: "none" }}
            disabled={avatarLoading}
          />
        )}

        <div className="meta">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <ul className="counters">
            <li>Recipes: {user.stats?.recipes ?? 0}</li>
            <li>Favorites: {user.stats?.favorites ?? 0}</li>
            <li>Followers: {user.stats?.followers ?? 0}</li>
            <li>Following: {user.stats?.following ?? 0}</li>
          </ul>
        </div>
      </div>

      <div className="user-right">
        {!isSelf && (
          <Button onClick={toggleFollow} disabled={pending || followPending || unfollowPending}>
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        )}

        {isSelf && (
          <>
            <Button variant="danger" onClick={() => setOpen(true)}>Log Out</Button>
            <Modal isOpen={open} onClose={() => setOpen(false)} title="Confirm logout">
              <p>Are you sure you want to log out?</p>
              <div className="row gap-8">
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant="danger" onClick={onConfirmLogout}>
                  Log Out
                </Button>
              </div>
            </Modal>
          </>
        )}
      </div>
    </section>
  );
}
