import React, { useMemo, useEffect } from "react";
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
import styles from "./RecipesLayout.module.css";

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

  useEffect(() => {
    if (!category) return;

    const params = {
      category,
      page: currentPage,
      limit,
      ...(selectedIngredient ? { ingredient: selectedIngredient } : {}),
      ...(selectedArea ? { area: selectedArea } : {}),
    };

    dispatch(getRecipesByCategory(params)).catch(console.error);
  }, [
    dispatch,
    category,
    currentPage,
    limit,
    selectedIngredient,
    selectedArea,
  ]);

  const handleBackToCategories = () => dispatch(resetToCategories());

  const handlePageChange = (p) => {
    if (p === currentPage || p < 1 || p > pages || !category) return;

    const params = {
      category,
      page: p,
      limit,
      ...(selectedIngredient ? { ingredient: selectedIngredient } : {}),
      ...(selectedArea ? { area: selectedArea } : {}),
    };

    dispatch(getRecipesByCategory(params))
      .unwrap()
      .then(() => window.scrollTo({ top: 0, behavior: "smooth" }))
      .catch(console.error);
  };

  if (isLoading) return <Loader />;

  return (
    <section className={styles.section}>
      <div className={styles.backRow}>
        <button className={styles.backBtn} onClick={handleBackToCategories}>
          BACK
        </button>
      </div>

      <h2 className={styles.title}>{category || "RECIPES"}</h2>
      <p className={styles.lead}>
        Go on a taste journey, where every sip is a sophisticated creative
        chord, and every dessert is an expression of the most refined
        gastronomic desires.
      </p>

      <div className={styles.content}>
        <RecipeFilters />

        {items.length === 0 ? (
          <div>
            Found {total ?? 0} recipes
            <br />
            No recipes
          </div>
        ) : (
          <>
            <div className={styles.cardsGrid}>
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
    </section>
  );
};

export default Recipes;
