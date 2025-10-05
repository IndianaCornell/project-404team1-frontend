import { useState } from "react";
import { Outlet } from "react-router-dom";

import Container from "@components/ui/Container/Container";
import MainTitle from "@components/common/Typography/MainTitle";
import Subtitle from "@components/common/Typography/Subtitle";
import Button from "@components/ui/Button";

import UserInfo from "@pages/User/UserInfo/UserInfo";
import TabsList from "@pages/User/TabList/TabsList";

import {
  useFollow,
  useOwner,
  useUpdateAvatar,
  useUserProfile,
} from "@hooks/user";
import { useLogout } from "@hooks/auth";
import LogOutModal from "@components/common/Modal/LogOutModal";

import styles from "./UserPage.module.css";

const UserPage = () => {
  const owner = useOwner();
  const { onFollow, onUnfollow } = useFollow();
  const { onLogout } = useLogout();

  const { userProfile, isLoading } = useUserProfile();

  const onUpdateAvatar = useUpdateAvatar();

  const isOwner = owner?._id === userProfile?._id;
  const user = userProfile;
  const userImg = isOwner ? owner?.avatar : userProfile?.avatar;
  const isFollow =
    Array.isArray(owner?.following) &&
    owner.following.includes(userProfile?._id);

  const [isLogoutModal, setIsLogoutModal] = useState(false);
  const onOpenLogoutModal = () => setIsLogoutModal(true);
  const onCloseLogoutModal = () => setIsLogoutModal(false);

  const buttonText = isOwner ? "log out" : isFollow ? "following" : "follow";
  const onButtonClick = () => {
    if (isOwner) return onOpenLogoutModal();
    return isFollow ? onUnfollow() : onFollow();
  };

  return (
    <section className={styles.page}>
      <Container>
        <div className={styles.texts}>
          <MainTitle>PROFILE</MainTitle>
          <Subtitle>
            Reveal your culinary art, share your favorite recipe and create
            gastronomic masterpieces with us.
          </Subtitle>
        </div>

        <div className={styles.content}>
          {/* Ліва колонка */}
          <div className={styles.info_wrapper}>
            <UserInfo
              isOwner={isOwner}
              user={user}
              userImg={userImg}
              isLoading={isLoading}
              onUpdateAvatar={onUpdateAvatar}
            />
            <Button onClick={onButtonClick}>{buttonText}</Button>
          </div>

          {/* Права колонка */}
          <div className={styles.main}>
            <TabsList isOwner={isOwner} />
            <Outlet />
          </div>
        </div>
      </Container>

      {isLogoutModal && (
        <LogOutModal isOpen={isLogoutModal} onClose={onCloseLogoutModal} />
      )}
    </section>
  );
};

export default UserPage;
