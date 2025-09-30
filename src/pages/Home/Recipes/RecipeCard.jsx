// src/pages/CategoryRecipesPage/RecipeCard.jsx
import React from "react";
import s from "./RecipeCard.module.css";

export default function RecipeCard({ recipe }) {
  // очікується структура recipe:
  // { id, title, description, image, author: {name, avatar}, likes, comments }
  return (
    <article className={s.card}>
      <div className={s.thumb}>
        <img src={recipe.thumb} alt={recipe.title} />
      </div>

      <div className={s.body}>
        <h3 className={s.title}>{recipe.title}</h3>
        <p className={s.snippet}>{recipe.description}</p>

        <div className={s.meta}>
          <div className={s.author}>
            <img className={s.avatar} src={recipe.author?.avatar} alt={recipe.author?.name} />
            <span className={s.authorName}>{recipe.author?.name}</span>
          </div>

        </div>
      </div>
    </article>
  );
}
