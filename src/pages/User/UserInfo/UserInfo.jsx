import styles from "./UserInfo.module.css";
import UploadButton from "@/components/ui/UploadButton/UploadButton";
import { getImagePath, TYPE_IMG } from "@helpers/getImagePath";

const UserInfo = ({ isOwner, user, userImg, onUpdateAvatar, isLoading }) => {
  if (isLoading || !user) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.avatar}>
          <div className={styles.img}>
            <div className={styles.loader}>Loading...</div>
          </div>
        </div>
        <p className={styles.name}>Loading...</p>
        <ul className={styles.list}>
          <InfoItem title="Email" value="..." />
          <InfoItem title="Added recipes" value="..." />
          {isOwner && <InfoItem title="Favorites" value="..." />}
          <InfoItem title="Followers" value="..." />
          {isOwner && <InfoItem title="Following" value="..." />}
        </ul>
      </div>
    );
  }

  const name = user?.name || "No name";
  const email = user?.email || "No email";
  const recipes = user?.createdRecipesCount ?? 0;
  const favorites = user?.favoritesCount ?? 0;
  const followers = user?.followersCount ?? 0;
  const following = user?.followingCount ?? 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar}>
        <div className={styles.img}>
          <img src={getImagePath(userImg, TYPE_IMG.AVATAR)} alt={name} />
        </div>
        {isOwner && <UploadButton onChange={onUpdateAvatar} />}
      </div>
      <p className={styles.name}>{name}</p>
      <ul className={styles.list}>
        <InfoItem title="Email" value={email} />
        <InfoItem title="Added recipes" value={recipes} />
        {isOwner && <InfoItem title="Favorites" value={favorites} />}
        <InfoItem title="Followers" value={followers} />
        {isOwner && <InfoItem title="Following" value={following} />}
      </ul>
    </div>
  );
};

export default UserInfo;

const InfoItem = ({ title, value }) => {
  return (
    <li className={styles.item}>
      <span className={styles.title}>{title}:</span>
      <span className={styles.value}>{value}</span>
    </li>
  );
};