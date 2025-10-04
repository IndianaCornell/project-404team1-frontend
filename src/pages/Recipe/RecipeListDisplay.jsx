import React from "react";
import styles from "./RecipeListDisplay.module.css";

const RecipeListDisplay = ({ recipes }) => {
  if (!recipes || recipes.length === 0) {
    return null;
  }

  const recipe = recipes[0];

  if (!recipe.ingredients || recipe.ingredients.length === 0) {
    return (
      <div className={styles.ingredientsSection}>
        <h2>INGREDIENTS</h2>
        <p>No ingredients available</p>
      </div>
    );
  }

  return (
    <div className={styles.ingredientsSection}>
      <h2>INGREDIENTS</h2>
      <div className={styles.ingredientsList}>
        {recipe.ingredients.map((ingredient, index) => (
          <div key={index} className={styles.ingredientCard}>
            {ingredient.img && (
              <img
                src={ingredient.img}
                alt={ingredient.name}
                className={styles.ingredientImage}
              />
            )}
            <div className={styles.ingredientInfo}>
              <h3 className={styles.ingredientName}>{ingredient.name}</h3>
              <p className={styles.ingredientMeasure}>{ingredient.measure}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeListDisplay;
