import React from "react";
import s from "./CategoryList.module.css";
import CategoryCard from "@pages/Home/Categories/CategoryList/CategoryCard/CategoryCard.jsx";
import Loader from "@components/common/Loader/Loader.jsx";

const bigCategories = [2, 3, 8, 9, 14];

function CategoryList({ categories, isLoading }) {
  return (
    <div className={s.categoriesWrapper}>
      {isLoading ? (
        <Loader />
      ) : (
        categories.map((category, index) => {
          return (
            <CategoryCard
              key={category._id?.$oid || category.name || index}
              category={{
                ...category,
                size: bigCategories.includes(index) ? 2 : 1,
              }}
            />
          );
        })
      )}
    </div>
  );
}

export default CategoryList;
