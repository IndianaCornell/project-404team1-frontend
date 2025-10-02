import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ListItems from '@pages/User/ListItems.jsx';
import { TYPE_TABS, EMPTY_TEXT } from '@constants/common';
import { recipeApi } from '@services/Api';
import { useOwner } from '@hooks/user';
import * as authSlice from '@redux/slices/authSlice.js';

const RecipesPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [recipes, setRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const owner = useOwner();
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  const onChangePage = ({ selected }) => {
    setPage(selected + 1);
  };

  const getRecipes = async () => {
    try {
      setIsLoading(true);

      const { data } = await recipeApi.getRecipes(id, {
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
  }, [recipes?.result?.length, page]);

  const onDeleteRecipe = async id => {
    try {
      await recipeApi.deleteRecipe(id);
      setRecipes(prev => ({
        ...prev,
        result: prev.result.filter(recipe => recipe._id !== id),
      }));
      await dispatch(
        authSlice.updateUserProfile({ key: 'recipes', value: -1 })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ListItems
      emptyText={EMPTY_TEXT.RECIPES}
      data={recipes}
      type={TYPE_TABS.RECIPE}
      onDeleteRecipe={onDeleteRecipe}
      isOwner={owner?._id === id}
      isLoading={isLoading}
      page={page}
      onChangePage={onChangePage}
      itemsPerPage={itemsPerPage}
    />
  );
};

export default RecipesPage;