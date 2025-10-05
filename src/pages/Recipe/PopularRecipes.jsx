import { useEffect, useState } from "react";
import { recipesApi } from "@services/Api";
import RecipeCard from "@pages/Home/Recipes/RecipeCard";

import styles from "./PopularRecipes.module.css";

function getRandomItems(array, n) {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, n);
}

export default function PopularRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchPopular = async () => {
      const res = await recipesApi.getPopular();
      const all = res.data.items || [];
      const randomFour = getRandomItems(all, 4);
      setRecipes(randomFour);
    };

    fetchPopular();
  }, []);

  return (
    <div className={`${styles.popularRecipesBox}`}>
      <h2 className={styles.popularRecipesTitle}>Popular recipes</h2>
      <ul className={styles.popularRecipesList}>
        {recipes.map((r) => (
          <li className={styles.popularRecipesItem} key={r.id || r._id}>
            <RecipeCard recipe={r} />
          </li>
        ))}
      </ul>
    </div>
  );
}
