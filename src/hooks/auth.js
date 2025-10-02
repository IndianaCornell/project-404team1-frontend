import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { getToken } from '../utils/cookies';
import * as authOperations from '../redux/slices/authOperations.js';
import * as authSlice from '../redux/slices/authSlice.js';
import * as favoritesSlice from '../redux/slices/favoritesSlice.js';

export const useFetchSession = () => {
  const dispatch = useDispatch();
  const token = getToken();

  useEffect(() => {
    if (token) {
      dispatch(authOperations.getMe());
    } else {
      dispatch(authSlice.setRefreshing(false));
    }
  }, [dispatch, token]);
};

export const useLogout = () => {
  const dispatch = useDispatch();

  const onLogout = async () => {
    try {
      const resultAction = await dispatch(authOperations.logout());
      unwrapResult(resultAction);
      dispatch(
        favoritesSlice({
          favorites: [],
        })
      );
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return { onLogout };
};
