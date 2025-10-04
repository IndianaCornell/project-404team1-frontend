import { useState, useEffect } from 'react';
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

  const onChangePage = ({ selected }) => {
    setPage(selected + 1);
  };

  const getUsers = async () => {
  try {
    const { data } = await userApi.getFollowers({
      userId: id, // если сервер требует userId
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

  return (
    <ListItems
      type={TYPE_TABS.USER}
      emptyText={EMPTY_TEXT.FOLLOWERS}
      currentPage={page}
      onCurrentPageChange={onChangePage}
      data={users}
      isLoading={isLoading}
      owner={owner}
      onFollow={onFollow}
      onUnfollow={onUnfollow}
      page={page}
      onChangePage={onChangePage}
      itemsPerPage={itemsPerPage}
    />
  );
};

export default FollowersPage;
