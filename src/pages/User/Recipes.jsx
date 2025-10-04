// src/pages/User/RecipesPage.jsx
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ListItems from '@/pages/User/ListItems/ListItems.jsx';
import { TYPE_TABS, EMPTY_TEXT } from '@constants/common';
import { recipeApi } from '@services/Api';
import { useOwner } from '@hooks/user';
import * as authSlice from '@redux/slices/authSlice.js';
import { useParams } from 'react-router-dom';

const RecipesPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [recipes, setRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const owner = useOwner();
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  const onChangePage = ({ selected }) => setPage(selected + 1);

  const getRecipes = async () => {
    setIsLoading(true);
    try {
      const recipeId = /^\d+$/.test(id) ? Number(id) : id;
      const { data } = await recipeApi.getRecipes(recipeId, {
        page,
        limit: itemsPerPage,
      });
    } catch (error) {
      console.error(error);
      setRecipes(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setRecipes(null);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    getRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, page]);

  useEffect(() => {
    if (recipes?.result?.length === 0 && page > 1) {
      setPage((prev) => prev - 1);
    }
  }, [recipes?.result?.length, page]);

  const onDeleteRecipe = async recipeId => {
    try {
      await recipeApi.deleteRecipe(recipeId);
      setRecipes(prev => ({
        ...prev,
        result: prev.result.filter(recipe => recipe._id !== recipeId),
      }));
      await dispatch(
        authSlice.updateUserProfile({ key: 'recipes', value: -1 })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ListItems
      emptyText={EMPTY_TEXT.RECIPES}
      data={recipes}                         // тепер має { result, total, page, limit }
      type={TYPE_TABS.RECIPE}
      onDeleteRecipe={onDeleteRecipe}
      isOwner={String(owner?.id ?? owner?._id) === String(id)}
      isLoading={isLoading}
      page={page}
      onChangePage={onChangePage}
      itemsPerPage={itemsPerPage}
    />
  );
};

export default RecipesPage;