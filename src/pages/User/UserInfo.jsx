import styles from './UserInfo.module.css';
import UploadButton  from '@ui/UploadButton';
import { getImagePath, TYPE_IMG } from '@helpers/getImagePath';

const UserInfo = ({ isOwner, user, userImg, onUpdateAvatar }) => {
  const name = user?.name || 'No name';
  const email = user?.email || 'No email';
  const recipes = user?.recipes ?? 0;
  const favorites = user?.favorites ?? 0;
  const followers = user?.followers ?? 0;
  const following = user?.following ?? 0;

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
