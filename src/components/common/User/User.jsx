import styles from './User.module.css';
import { PathInfo } from '../PathInfo';
import { MainTitle } from '../../ui/Typography/MainTitle';
import { Subtitle } from '../../ui/Typography/Subtitle';
import { Button } from '../../ui/Button.jsx';
import { Container } from '../../ui/Container';
import { PageLoader } from '../../ui/Loader';

import UserInfo from '../UserInfo';
import TabsList from '../TabsList';
import LogOutModal from '../LogOutModal';

const User = ({
  isOwner,
  user,
  userImg,
  isFollow,
  isLoading,
  onFollowClick,
  onUpdateAvatar,
  onLogout,
  isLogoutModal,
  onOpenLogoutModal,
  onCloseLogoutModal,
}) => {
  const textButton = isOwner ? 'log out' : isFollow ? 'following' : 'follow';

  const onButtonClick = () => {
    if (isOwner) {
      onOpenLogoutModal();
    } else {
      onFollowClick(user?._id);
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <section className={styles.page}>
      <Container>
        <PathInfo path="profile" />
        <div className={styles.texts}>
          <MainTitle text="Profile" />
          <Subtitle text="Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us." />
        </div>
        <div className={styles.content}>
          <div className={styles.info_wrapper}>
            <UserInfo
              isOwner={isOwner}
              user={user}
              userImg={userImg}
              onUpdateAvatar={onUpdateAvatar}
            />
            <Button onClick={onButtonClick}>{textButton}</Button>
          </div>
          <TabsList isOwner={isOwner} />
        </div>
      </Container>
      <LogOutModal
        isOpen={isLogoutModal}
        onCancel={onCloseLogoutModal}
        onSuccess={() => {
          onLogout();
          onCloseLogoutModal();
        }}
      />
    </section>
  );
};

export default User;
