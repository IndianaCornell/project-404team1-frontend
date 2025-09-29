import React from "react";
import { useDispatch } from "react-redux";
import s from "./CategoryCard.module.css";
import ArrowButton from "@components/common/ArrowButton/ArrowButton.jsx";
import { getRecipesByCategory } from "@redux/slices/recipesOperations.js";

function CategoryCard({ category }) {
  const dispatch = useDispatch();

  const getSize = (size) => {
    if (size === 1) return s.categoryCardSmall;
    if (size === 2) return s.categoryCardBig;
    return s.categoryCardFullWidth;
  };

  const handleCategoryClick = () => {
    dispatch(
      getRecipesByCategory({ category: category.name, page: 1, limit: 12 }),
    );
  };

  return (
    <div className={getSize(category.size)} onClick={handleCategoryClick}>
      <img
        src={category.image ?? ""}
        alt={category.name}
        className={s.categoryImage}
      />
      <div className={s.categoryContent}>
        <span className={s.categoryName}>{category.name}</span>
        <ArrowButton color={"white"} onClick={handleCategoryClick} />
      </div>
    </div>
  );
}

export default CategoryCard;
