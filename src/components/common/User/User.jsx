import styles from "./User.module.css";
import PathInfo from "../PathInfo/PathInfo";
import MainTitle from "@components/common/Typography/MainTitle";
import Subtitle from "@components/common/Typography/Subtitle";
import Button from "@ui/Button";
import Container from "@/components/ui/Container/Container";
import Loader from "@components/common/Loader/Loader";

import UserInfo from "@/pages/User/UserInfo/UserInfo";
import TabsList from "@/pages/User/TabList/TabsList";
import LogOutModal from "@components/common/Modal/LogOutModal";
import ListItems from "@/pages/User/ListItems/ListItems";

const User = ({
  isOwner,
  user,
  userImg,
  isFollow,
  isLoading,
  onFollowClick,
  onUpdateAvatar,
  isLogoutModal,
  onOpenLogoutModal,
  onCloseLogoutModal,
}) => {
  const textButton = isOwner ? "log out" : isFollow ? "following" : "follow";

  const onButtonClick = () => {
    if (isOwner) {
      onOpenLogoutModal();
    } else {
      onFollowClick(user?._id);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={styles.page}>
      <Container>
        <PathInfo path="profile" />
        <div className={styles.texts}>
          <MainTitle children="Profile" />
          <Subtitle children="Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us." />
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
      {isLogoutModal && (
        <LogOutModal isOpen={isLogoutModal} onClose={onCloseLogoutModal} />
      )}
    </section>
  );
};

export default User;
