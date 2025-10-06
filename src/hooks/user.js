import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { userApi } from "../services/Api";
import { showNotification } from "../redux/slices/notificationsSlice.js";
import * as authSelectors from "../redux/slices/authSelectors.js";
import * as authOperations from "../redux/slices/authOperations";
import * as authSlice from "../redux/slices/authSlice.js";

export const useOwner = () => {
  const owner = useSelector(authSelectors.getUser);

  return owner;
};

export const useFollow = () => {
  const dispatch = useDispatch();

  const onFollow = async (id) => {
    try {
      await userApi.followUser(id);
      dispatch(authSlice.updateFollowing(id));
      dispatch(authSlice.updateUserProfile({ key: "following", value: 1 }));
      dispatch(
        showNotification({ type: "success", message: "You followed this user" })
      );
    } catch (error) {
      console.log(error);
      dispatch(showNotification({ type: "error", message: "Follow failed" }));
    }
  };

  const onUnfollow = async (id) => {
    try {
      await userApi.unfollowUser(id);
      dispatch(authSlice.updateFollowing(id));
      dispatch(authSlice.updateUserProfile({ key: "following", value: -1 }));
      dispatch(
        showNotification({ type: "info", message: "You unfollowed this user" })
      );
    } catch (error) {
      console.log(error);
      dispatch(showNotification({ type: "error", message: "Unfollow failed" }));
    }
  };

  return { onFollow, onUnfollow };
};

export const useUpdateAvatar = () => {
  const dispatch = useDispatch();

  const onUpdateAvatar = async ({ target }) => {
    const file = target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      dispatch(
        showNotification({
          type: "error",
          message: "Please upload a valid image (JPEG, PNG, WEBP)",
        })
      );
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      // >2MB
      dispatch(
        showNotification({
          type: "error",
          message: "File is too large (max 2MB)",
        })
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const { data } = await userApi.updateAvatar(formData);

      dispatch(authSlice.updateAvatar(data?.avatar));
      dispatch(
        showNotification({
          type: "success",
          message: "Avatar updated successfully!",
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(
        showNotification({ type: "error", message: "Avatar update failed" })
      );
    }
  };

  return onUpdateAvatar;
};

export const useUserProfile = () => {
  const { id: paramId } = useParams();
  const dispatch = useDispatch();

  const userProfile = useSelector(authSelectors.getUserProfile);
  const isLoading = useSelector(authSelectors.getLoading);
  const owner = useOwner();

  const id =
    paramId ||
    owner?.id ||
    (owner?._id?.$oid
      ? String(owner._id.$oid)
      : owner?._id
        ? String(owner._id)
        : undefined);

  useEffect(() => {
    if (!id) return;
    dispatch(authOperations.getUserProfile(id));
  }, [dispatch, id]);

  return { userProfile, isLoading };
};
