import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import ListItems from '@/pages/User/ListItems/ListItems.jsx';
import { TYPE_TABS, EMPTY_TEXT } from '@constants/common';
import { userApi } from '@services/Api';
import { useFollow, useOwner } from '@hooks/user';

const FollowersPage = () => {
  const { id } = useParams();
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const owner = useOwner();
  const { onFollow, onUnfollow } = useFollow();

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const onChangePage = ({ selected }) => setPage(selected + 1);

  const [optimisticFollowing, setOptimisticFollowing] = useState(
    () => new Set((owner?.following ?? []).map(String))
  );

  useEffect(() => {
    setOptimisticFollowing(new Set((owner?.following ?? []).map(String)));
  }, [owner?.id, owner?.following]);

  const ownerWithOptimistic = useMemo(
    () => ({
      ...owner,
      following: Array.from(optimisticFollowing),
    }),
    [owner, optimisticFollowing]
  );

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const { data } = await userApi.getFollowers(id, {
        page,
        limit: itemsPerPage,
      });
      setUsers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    getUsers();
  }, [id, page]);

  const handleFollow = async (targetUserId) => {
    const uid = String(targetUserId);
    console(uid);
    if (!uid) return;

    setOptimisticFollowing((prev) => {
      const next = new Set(prev);
      next.add(uid);
      return next;
    });

    try {
      await onFollow?.(uid);
    } catch (e) {
      setOptimisticFollowing((prev) => {
        const next = new Set(prev);
        next.delete(uid);
        return next;
      });
      console.log(e);
    }
  };

  const handleUnfollow = async (targetUserId) => {
    const uid = String(targetUserId);
    if (!uid) return;

    setOptimisticFollowing((prev) => {
      const next = new Set(prev);
      next.delete(uid);
      return next;
    });

    try {
      await onUnfollow?.(uid);
    } catch (e) {
      setOptimisticFollowing((prev) => {
        const next = new Set(prev);
        next.add(uid);
        return next;
      });
      console.log(e);
    }
  };

  return (
    <ListItems
      type={TYPE_TABS.USER}
      emptyText={EMPTY_TEXT.FOLLOWERS}
      currentPage={page}
      onCurrentPageChange={onChangePage}
      data={users}
      isLoading={isLoading}

      owner={ownerWithOptimistic}

      onFollow={handleFollow}
      onUnfollow={handleUnfollow}

      page={page}
      onChangePage={onChangePage}
      itemsPerPage={itemsPerPage}
    />
  );
};

export default FollowersPage;