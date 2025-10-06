// src/pages/User/RecipesPage.jsx
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ListItems from "@pages/User/ListItems/ListItems";
import { TYPE_TABS, EMPTY_TEXT } from "@constants/common";
import { recipeApi } from "@services/Api";
import * as authSlice from "@redux/slices/authSlice.js";
import { showNotification } from "@redux/slices/notificationsSlice";

const RecipesPage = () => {
  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  const onChangePage = ({ selected }) => setPage(selected + 1);

  const getRecipes = async () => {
    try {
      setIsLoading(true);
      const { data } = await recipeApi.getMyRecipes({
        page,
        limit: itemsPerPage,
      });

      setRecipes({
        result: data.items ?? [],
        items: data.items ?? [],
        total: Number(data.total ?? 0),
        page: Number(data.page ?? page),
        limit: Number(data.limit ?? itemsPerPage),
      });
    } catch (error) {
      console.log(error);
      setRecipes({
        result: [],
        items: [],
        total: 0,
        page,
        limit: itemsPerPage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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
        const filtered = (prev.result ?? []).filter(
          (r) => String(r.id ?? r._id) !== String(recipeId)
        );
        return {
          ...prev,
          result: filtered,
          items: filtered,
          total: Math.max(0, (prev.total ?? 0) - 1),
        };
      });

      await dispatch(
        authSlice.updateUserProfile({ key: "recipes", value: -1 })
      );

      dispatch(
        showNotification({
          type: "success",
          message: "Recipe deleted successfully",
        })
      );
    } catch (error) {
      console.error("Error deleting recipe:", error);
      dispatch(
        showNotification({
          type: "error",
          message: error.response?.data?.message || "Failed to delete recipe",
        })
      );
    }
  };

  return (
    <ListItems
      emptyText={EMPTY_TEXT.RECIPES}
      data={recipes}
      type={TYPE_TABS.RECIPE}
      onDeleteRecipe={onDeleteRecipe}
      isOwner={true}
      isLoading={isLoading}
      page={page}
      onChangePage={onChangePage}
      itemsPerPage={itemsPerPage}
    />
  );
};

export default RecipesPage;
