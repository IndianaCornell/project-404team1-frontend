import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ListItems from "@pages/User/ListItems.jsx";
import { TYPE_TABS, EMPTY_TEXT } from "@constants/common";
import { recipeApi } from "@services/Api";

const FavoritesPage = () => {
  const { id } = useParams();
  const [recipes, setRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  const onChangePage = ({ selected }) => setPage(selected + 1);

  const getRecipes = async () => {
    try {
      setIsLoading(true);
      const { data } = await recipeApi.getFavoriteRecipes({
        userId: id,
        page,
        limit: itemsPerPage,
      });

      setRecipes({
        result: data.items ?? [],
        total: Number(data.total ?? 0),
        page: Number(data.page ?? page),
        limit: Number(data.limit ?? itemsPerPage),
      });
    } catch (error) {
      console.log(error);
      setRecipes({
        result: [],
        total: 0,
        page,
        limit: itemsPerPage,
      });
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
      await recipeApi.removeFromFavorites(recipeId);

      setRecipes((prev) => {
        if (!prev) return prev;
        const filtered = prev.result.filter(
          (r) => String(r.id ?? r._id) !== String(recipeId)
        );
        return {
          ...prev,
          result: filtered,
          total: Math.max(0, (prev.total ?? filtered.length) - 1),
        };
      });

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