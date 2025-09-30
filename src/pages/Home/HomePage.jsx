import React from "react";
import { useSelector } from "react-redux";
import Categories from "@pages/Home/Categories/Categories/Categories.jsx";
import Recipes from "@pages/Home/Recipes/Recipes.jsx";
import { selectShowRecipes } from "@redux/slices/recipesSlice.js";
import Hero from "./Hero";

const HomePage = () => {
  const showRecipes = useSelector(selectShowRecipes);

  return (
    <div>
      <Hero></Hero>
      {showRecipes ? <Recipes /> : <Categories />}
    </div>
  );
};

export default HomePage;
