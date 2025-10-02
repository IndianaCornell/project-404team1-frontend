import React from "react";
import { useSelector } from "react-redux";
import Categories from "@pages/Home/Categories/Categories/Categories.jsx";
import Recipes from "@pages/Home/Recipes/Recipes.jsx";
import { selectShowRecipes } from "@redux/slices/recipesSlice.js";
import Hero from "./Hero";
import Testimonials from "./Testimonials";

const HomePage = () => {
  const showRecipes = useSelector(selectShowRecipes);

  return (
    <div>
      <Hero></Hero>
      {showRecipes ? <Recipes /> : <Categories />}
      <Testimonials></Testimonials>
    </div>
  );
};

export default HomePage;
