import React, { useEffect } from "react";
import s from "./Categories.module.css";
import CategoryList from "@pages/Home/Categories/CategoryList/CategoryList.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategories,
  selectCategoriesError,
  selectCategoriesLoading,
} from "@redux/slices/categoriesSlice.js";
import { getCategories } from "@redux/slices/categoriesOperations.js";

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectCategoriesLoading);
  const error = useSelector(selectCategoriesError);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
    }
  }, [error]);

  return (
    <section className={s.categoriesSection}>
      <h2 className={s.sectionTitle}>Categories</h2>
      <p className={s.sectionSubtitle}>
        Discover a limitless world of culinary possibilities and enjoy exquisite
        recipes that combine taste, style and the warm atmosphere of the
        kitchen.
      </p>
      <CategoryList categories={categories} isLoading={isLoading} />
    </section>
  );
};

export default Categories;
