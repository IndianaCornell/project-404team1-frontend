import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { userApi } from '../services/Api';
import * as authSelectors from '../redux/slices/authSelectors.js';
import * as authOperations from '../redux/slices/authOperations';
import * as authSlice from '../redux/slices/authSlice.js';

export const useOwner = () => {
  const owner = useSelector(authSelectors.getUser);

  return owner;
};

export const useFollow = () => {
  const dispatch = useDispatch();

  const onFollow = async id => {
    try {
      await userApi.followUser(id);
      await dispatch(authSlice.updateFollowing(id));
      await dispatch(
        authSlice.updateUserProfile({ key: 'following', value: 1 })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onUnfollow = async id => {
    try {
      await userApi.unfollowUser(id);
      await dispatch(authSlice.updateFollowing(id));
      await dispatch(
        authSlice.updateUserProfile({ key: 'following', value: -1 })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return { onFollow, onUnfollow };
};

export const useUpdateAvatar = () => {
  const dispatch = useDispatch();

  const onUpdateAvatar = async ({ target }) => {
    const formData = new FormData();
    formData.append('avatar', target.files[0]);

    try {
      const { data } = await userApi.updateAvatar(formData);
      dispatch(authSlice.updateAvatar(data?.avatar));
    } catch (error) {
      console.log(error);
    }
  };

  return { onUpdateAvatar };
};

export const useUserProfile = () => {
  const { id: paramId } = useParams();
  const dispatch = useDispatch();
  const userProfile = useSelector(authSelectors.getUserProfile);
  const isLoading = useSelector(authSelectors.getLoading);
  const owner = useOwner();

  const id = paramId || owner?._id;

  useEffect(() => {
    if (!id) return;

    dispatch(authOperations.getUserProfile(id));
  }, [dispatch, id]);

  return {
    userProfile,
    isLoading,
  };
};
