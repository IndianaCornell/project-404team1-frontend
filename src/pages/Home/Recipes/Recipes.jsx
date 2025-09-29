import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetToCategories,
  selectRecipes,
  selectRecipesLoading,
  selectSelectedCategory,
} from "@redux/slices/recipesSlice.js";
import Loader from "@components/common/Loader/Loader.jsx";

const Recipes = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const isLoading = useSelector(selectRecipesLoading);
  const selectedCategory = useSelector(selectSelectedCategory);

  const handleBackToCategories = () => {
    dispatch(resetToCategories());
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={handleBackToCategories}
          style={{ marginBottom: "10px" }}
        >
          ← Back to Categories
        </button>
        <h2>Recipes in {selectedCategory.name} Category</h2>
        <p>Found {recipes.length} recipes</p>
      </div>
    </div>
  );
};

export default Recipes;
