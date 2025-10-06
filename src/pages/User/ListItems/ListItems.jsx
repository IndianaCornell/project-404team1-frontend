import styles from './ListItems.module.css';
import { TYPE_TABS } from '@constants/common';
import RecipePreview from '../RecipePreview/RecipePreview.jsx';
import UserCard from '../UseCard/UserCard.jsx';
import ListPagination from '../ListPagination/ListPagination.jsx';
import Loader from '@components/common/Loader/Loader.jsx';

const ListItems = ({
  emptyText,
  type,
  data,
  onDeleteRecipe,
  isOwner,
  owner,
  onFollow,
  onUnfollow,
  isLoading,
  page,
  onChangePage,
  itemsPerPage,
  loadingFollowId
}) => {
  if (isLoading) {
    return (
      <div className={styles.empty}>
        <Loader />
      </div>
    );
  }

  if (!data?.result?.length) {
    return (
      <div className={styles.empty}>
        <p className={styles.empty_text}>{emptyText}</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {data?.result?.map(item => {
          const key = item.id || item._id;

          if (type === TYPE_TABS.RECIPE) {
            return (
              <li key={key} className={styles.item_recipe}>
                <RecipePreview
                  recipe={item}
                  onDeleteRecipe={onDeleteRecipe}
                  isOwner={isOwner}
                />
              </li>
            );
          }

          if (type === TYPE_TABS.USER) {
            return (
              <li key={key} className={styles.item_user}>
                <UserCard
                  user={item}
                  owner={owner}
                  onFollow={onFollow}
                  onUnfollow={onUnfollow}
                  loadingFollowId={loadingFollowId}
                />
              </li>
            );
          }

          return null;
        })}
      </ul>

      <ListPagination
        total={data?.total}
        itemsPerPage={itemsPerPage}
        currentPage={page}
        onPageChange={onChangePage}
      />
    </div>
  );
};

export default ListItems;
