import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListItems from '@/pages/User/ListItems/ListItems.jsx';
import { TYPE_TABS, EMPTY_TEXT } from '@constants/common';
import { userApi } from '@services/Api';
import { useFollow, useOwner } from '@hooks/user';

const FollowingPage = () => {
  const { id } = useParams();
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const owner = useOwner();
  const { onFollow, onUnfollow } = useFollow();
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const onChangePage = ({ selected }) => {
    setPage(selected + 1);
  };

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const { data } = await userApi.getFollowingByUser(id, {
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
      emptyText={EMPTY_TEXT.FOLLOWING}
      onCurrentPageChange={onChangePage}
      data={users}
      type={TYPE_TABS.USER}
      isLoading={isLoading}
      followingList={owner?.following}
      onFollow={onFollow}
      onUnfollow={onUnfollow}
      owner={owner}
      page={page}
      onChangePage={onChangePage}
      itemsPerPage={itemsPerPage}
    />
  );
};

export default FollowingPage;