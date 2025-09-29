import React from "react";
import { useSelector } from "react-redux";
import Categories from "@pages/Home/Categories/Categories/Categories.jsx";
import Recipes from "@pages/Home/Recipes/Recipes.jsx";
import { selectShowRecipes } from "@redux/slices/recipesSlice.js";

const HomePage = () => {
  const showRecipes = useSelector(selectShowRecipes);

  return <div>{showRecipes ? <Recipes /> : <Categories />}</div>;
};

export default HomePage;
