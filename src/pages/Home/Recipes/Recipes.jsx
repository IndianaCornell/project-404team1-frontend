import React, { useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  resetToCategories,
  selectRecipes,
  selectRecipesLoading,
  selectSelectedCategory,
  selectTotalItems,
  selectCurrentPage,
  selectItemsPerPage,
  selectTotalPages,
  selectSelectedIngredient,
  selectSelectedArea,
} from "@redux/slices/recipesSlice.js";
import Loader from "@components/common/Loader/Loader.jsx";
import RecipeCard from "./RecipeCard.jsx";
import RecipePagination from "./RecipePagination.jsx";
import { getRecipesByCategory } from "@redux/slices/recipesOperations.js";
import RecipeFilters from "@/pages/Home/Recipes/RecipeFilters";
import { useEffect } from "react";

const Recipes = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectRecipes);
  const isLoading = useSelector(selectRecipesLoading);
  const category = useSelector(selectSelectedCategory);
  const total = useSelector(selectTotalItems);
  const currentPage = useSelector(selectCurrentPage);
  const limit = useSelector(selectItemsPerPage);
  const totalPages = useSelector(selectTotalPages);
  const selectedIngredient = useSelector(selectSelectedIngredient);
  const selectedArea = useSelector(selectSelectedArea);

  const pages = useMemo(
    () => Math.max(1, totalPages || Math.ceil((total || 0) / (limit || 12))),
    [totalPages, total, limit]
  );

  const handleBackToCategories = () => dispatch(resetToCategories());

  const handlePageChange = (p) => {
    if (p === currentPage || p < 1 || p > pages || !category) return;
    dispatch(getRecipesByCategory({ category, page: p, limit }));
    dispatch(
      getRecipesByCategory({
        category,
        page: p,
        limit,
        ingredient: selectedIngredient || undefined,
        area: selectedArea || undefined,
      })
    )
      .unwrap()
      .then(() => window.scrollTo({ top: 0, behavior: "smooth" }))
      .catch(console.error);
  };

  // первинне завантаження + рефетч при зміні фільтрів/категорії/пагінації
  useEffect(() => {
    if (!category) return;
    dispatch(
      getRecipesByCategory({
        category,
        page: currentPage,
        limit,
        ingredient: selectedIngredient || undefined,
        area: selectedArea || undefined,
      })
    ).catch(console.error);
  }, [
    dispatch,
    category,
    currentPage,
    limit,
    selectedIngredient,
    selectedArea,
  ]);

  if (isLoading) return <Loader />;

  return (
    <div style={{ padding: 20 }}>
      <button onClick={handleBackToCategories}>← Back</button>
      <h2 style={{ marginTop: 12 }}>{category ? `${category}` : "Recipes"}</h2>
      {/* Панель фільтрів */}{" "}
      <div style={{ marginTop: 12 }}>
        <RecipeFilters />{" "}
      </div>
      <p>Found {total ?? items.length} recipes</p>
      {items.length === 0 ? (
        <div>No recipes</div>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
              marginTop: 16,
            }}
          >
            {items.map((r) => (
              <RecipeCard key={r.id || r._id} recipe={r} />
            ))}
          </div>

          <RecipePagination
            current={currentPage}
            pages={pages}
            disabled={isLoading}
            onChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Recipes;
