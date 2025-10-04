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
  const [recipes, setRecipes] = useState(null);   // { result, total, page, limit }
  const [isLoading, setIsLoading] = useState(true);
  const owner = useOwner();
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  const onChangePage = ({ selected }) => setPage(selected + 1);

  const getRecipes = async () => {
    try {
      setIsLoading(true);
      const { data } = await recipeApi.getRecipes({ page, limit: itemsPerPage});

      // 🔧 МАПІНГ під формат, який читає ListItems / ефекти
      setRecipes({
        result: data.items ?? [],
        total: Number(data.total ?? 0),
        page: Number(data.page ?? page),
        limit: Number(data.limit ?? itemsPerPage),
      });
    } catch (error) {
      console.log(error);
      setRecipes({ result: [], total: 0, page, limit: itemsPerPage });
    } finally {
      setIsLoading(false);
    }
  };

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

  const onDeleteRecipe = async (recipeId) => {
    try {
      await recipeApi.deleteRecipe(recipeId);
      setRecipes((prev) => {
        if (!prev) return prev;
        const filtered = prev.result.filter(
          (r) => String(r.id ?? r._id) !== String(recipeId)
        );
        return {
          ...prev,
          result: filtered,
          total: Math.max(0, (prev.total ?? 0) - 1),
        };
      });
      await dispatch(authSlice.updateUserProfile({ key: 'recipes', value: -1 }));
    } catch (error) {
      console.log(error);
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