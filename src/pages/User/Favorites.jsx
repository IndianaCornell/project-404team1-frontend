import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import ListItems from '@pages/User/ListItems.jsx';
import { TYPE_TABS, EMPTY_TEXT } from '@constants/common'
import { recipeApi } from '@services/Api';
import * as authSlice  from '@redux/slices/authSlice.js';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [recipes, setRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  const onChangePage = ({ selected }) => {
    setPage(selected + 1);
  };

  const getRecipes = async () => {
    try {
      setIsLoading(true);
      const { data } = await recipeApi.getFavoriteRecipes({
        userId: id,
        page,
        limit: itemsPerPage,
      });
      setRecipes(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    getRecipes();
  }, [id, page]);

  useEffect(() => {
    if (recipes?.result?.length === 0 && page > 1) {
      setPage(prev => prev - 1);
    }
  }, [recipes?.result?.length]);

  const onDeleteRecipe = async id => {
    try {
      await recipeApi.removeFromFavorites(id);
      setRecipes(prev => ({
        ...prev,
        result: prev.result.filter(recipe => recipe._id !== id),
      }));
      await dispatch(
        authSlice.updateUserProfile({ key: 'favorites', value: -1 })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ListItems
      emptyText={EMPTY_TEXT.FAVORITES}
      type={TYPE_TABS.RECIPE}
      isOwner={true}
      data={recipes}
      isLoading={isLoading}
      onDeleteRecipe={onDeleteRecipe}
      page={page}
      onChangePage={onChangePage}
      itemsPerPage={itemsPerPage}
    />
  );
};

export default FavoritesPage;