import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import User from '@components/common/User/User';
import {
  useFollow,
  useOwner,
  useUpdateAvatar,
  useUserProfile,
} from '@hooks/user';
import { useLogout } from '@hooks/auth';

const UserPage = () => {
  const owner = useOwner();
  const { onFollow, onUnfollow } = useFollow();
  const { onLogout } = useLogout();
  const { onUpdateAvatar } = useUpdateAvatar();
  const [isLogoutModal, setIsLogoutModal] = useState(false);
  const { userProfile, isLoading } = useUserProfile();
  console.log('userProfile:', userProfile);

  const onOpenLogoutModal = () => {
    setIsLogoutModal(true);
  };

  const onCloseLogoutModal = () => {
    setIsLogoutModal(false);
  };

  return (
    <>
      <User
        isOwner={owner?._id === userProfile?._id}
        user={userProfile}
        userImg={
          owner?._id === userProfile?._id ? owner?.avatar : userProfile?.avatar
        }
        isFollow={
          Array.isArray(owner?.following) &&
          owner.following.includes(userProfile?._id)
        }
        isLoading={isLoading}
        onFollowClick={
          Array.isArray(owner?.following) &&
          owner.following.includes(userProfile?._id)
            ? onUnfollow
            : onFollow
        }
        onUpdateAvatar={onUpdateAvatar}
        onLogout={onLogout}
        isLogoutModal={isLogoutModal}
        onOpenLogoutModal={onOpenLogoutModal}
        onCloseLogoutModal={onCloseLogoutModal}
      />
      <Outlet />
    </>
  );
};

export default UserPage;