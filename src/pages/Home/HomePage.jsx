import React from "react";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import Categories from "@pages/Home/Categories/Categories/Categories.jsx";
import Recipes from "@pages/Home/Recipes/Recipes.jsx";
import { selectShowRecipes } from "@redux/slices/recipesSlice.js";
import Hero from "./Hero";
import Testimonials from "./Testimonials";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const showRecipes = useSelector(selectShowRecipes);
  const { openModal } = useOutletContext();

  return (
    <div className={styles.heroBox}>
      <Hero openModal={openModal}></Hero>
      {showRecipes ? <Recipes /> : <Categories />}
      <Testimonials></Testimonials>
    </div>
  );
};

export default HomePage;
