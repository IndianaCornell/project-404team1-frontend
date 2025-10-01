import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import s from "./RecipeCard.module.css";
import { api } from "@lib/api.js";

export default function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  // нова структура з бекенду
  const recipeId = recipe.id || recipe._id;
  const author = recipe.author || {}; // { id, name, avatar }

  // обчислюємо ініціал для фолбек-аватара
  const authorInitial = useMemo(
    () => (author.name?.trim()?.[0] || "A").toUpperCase(),
    [author.name]
  );

  // локальний стан (оптимістично)
  const [isFav, setIsFav] = useState(Boolean(recipe.isFavorite));
  const [favCount, setFavCount] = useState(Number(recipe.favoritesCount ?? 0));
  const [busy, setBusy] = useState(false);

  const openRecipe = () => {
    if (!recipeId) return;
    navigate(`/recipe/${recipeId}`);
  };

  const toggleFavorite = async (e) => {
    e.stopPropagation?.();
    if (busy || !recipeId) return;

    const next = !isFav;
    const prevCount = favCount;

    setBusy(true);
    setIsFav(next);
    setFavCount((c) => (next ? c + 1 : Math.max(0, c - 1)));

    try {
      if (next) {
        await api.post(`/recipes/${recipeId}/favorite`);
      } else {
        await api.delete(`/recipes/${recipeId}/favorite`);
      }
      // Якщо бек тепер повертає актуальні поля, можна зняти оптимізм:
      // const { data } = await ...
      // setIsFav(Boolean(data.isFavorite));
      // setFavCount(Number(data.favoritesCount ?? 0));
    } catch (err) {
      console.error(err);
      // відкат
      setIsFav(!next);
      setFavCount(prevCount);

      const status = err.response?.status;
      if (status === 401) {
        alert("Ви не авторизовані. Увійдіть, щоб додати до улюблених.");
      } else if (status === 403) {
        alert("Доступ заборонений.");
      } else {
        alert("Не вдалося оновити улюблені. Спробуйте пізніше.");
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <article className={s.card} onClick={openRecipe} role="button" tabIndex={0}>
      <div className={s.thumb}>
        <img
          src={recipe.thumb || "/img/recipe-placeholder.jpg"}
          alt={recipe.title || "Recipe"}
          loading="lazy"
        />
      </div>

      <div className={s.body}>
        <h3 className={s.title}>{recipe.title || "Untitled recipe"}</h3>
        {recipe.description ? (
          <p className={s.snippet}>{recipe.description}</p>
        ) : null}

        <div className={s.meta}>
          <div className={s.author}>
            {author.avatar ? (
              <img
                className={s.avatar}
                src={author.avatar}
                alt={author.name || "Author"}
                loading="lazy"
              />
            ) : (
              <div className={s.avatarFallback} aria-hidden="true">
                {authorInitial}
              </div>
            )}
            <span className={s.authorName}>{author.name || "Author"}</span>
          </div>

          <div className={s.actions} onClick={(e) => e.stopPropagation()}>
            <button
              className={`${s.iconBtn} ${isFav ? s.favActive : ""}`}
              onClick={toggleFavorite}
              disabled={busy}
              aria-pressed={isFav}
              title={isFav ? "Remove from favorites" : "Add to favorites"}
              aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
            >
              <span style={{ fontSize: 16 }}>{isFav ? "♥" : "♡"}</span>
              {favCount ? <span className={s.badge}>{favCount}</span> : null}
            </button>

            <button
              className={s.iconBtn}
              onClick={openRecipe}
              title="Open recipe"
              aria-label="Open recipe"
            >
              <span style={{ fontSize: 16 }}>↗</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}