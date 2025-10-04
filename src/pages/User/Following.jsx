import { useState, useEffect } from 'react';
import ListItems from '@/pages/User/ListItems/ListItems.jsx';
import { TYPE_TABS, EMPTY_TEXT } from '@constants/common';
import { userApi } from '@services/Api';
import { useFollow, useOwner } from '@hooks/user';
import { useParams } from 'react-router-dom';

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
      const { data } = await userApi.getFollowing({
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
    setUsers(null);
  }, [id]);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, page]);

  return (
    <ListItems
      emptyText={EMPTY_TEXT.FOLLOWING}
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
