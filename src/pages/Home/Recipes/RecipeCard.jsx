import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  addFavoriteLocal,
  removeFavoriteLocal,
} from "@redux/slices/authSlice";
import s from "./RecipeCard.module.css";
import { recipeApi } from "@services/Api";

export default function RecipeCard({ recipe }) {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const recipeId = recipe.id || recipe._id;
  const author = recipe.author || {};

  // useEffect(() => {
  //   console.log("recipeId:", recipeId, typeof recipeId);
  //   console.log("user.favorites:", user?.favorites);
  //   const inc = (user?.favorites ?? []).map(String).includes(String(recipeId));
  //   console.log("includes? =>", inc);
  // }, [user?.favorites, recipeId]);

  const authorInitial = useMemo(
    () => (author.name?.trim()?.[0] || "A").toUpperCase(),
    [author.name]
  );

  const favoriteSet = useMemo(() => {
    const arr = Array.isArray(user?.favorites) ? user.favorites : [];
    return new Set(arr.map(String));
  }, [user?.favorites]);

  const derivedIsFav = useMemo(() => {
    if (!recipeId) return false;
    return favoriteSet.has(String(recipeId));
  }, [favoriteSet, recipeId]);

  const [isFav, setIsFav] = useState(derivedIsFav);
  const [favCount, setFavCount] = useState(Number(recipe.favoritesCount ?? 0));
  const [busy, setBusy] = useState(false);

  useEffect(() => setIsFav(derivedIsFav), [derivedIsFav]);
  useEffect(
    () => setFavCount(Number(recipe.favoritesCount ?? 0)),
    [recipe.favoritesCount]
  );

  const openRecipe = () => {
    if (recipeId) navigate(`/recipe/${recipeId}`);
  };

  const toggleFavorite = async (e) => {
    e.stopPropagation?.();
    if (busy || !recipeId) return;

    if (!user) {
      alert("Увійдіть, щоб додати до улюблених.");
      return;
    }

    const next = !isFav;
    const prevCount = favCount;

    setBusy(true);
    setIsFav(next);
    setFavCount((c) => (next ? c + 1 : Math.max(0, c - 1)));

    try {
      if (next) {
        await recipeApi.addToFavorites(recipeId);
        dispatch(addFavoriteLocal(recipeId));
      } else {
        await recipeApi.removeFromFavorites(recipeId);
        dispatch(removeFavoriteLocal(recipeId));
      }
      // dispatch(refreshUser());
    } catch (err) {
      console.error(err);
      setIsFav(!next);
      setFavCount(prevCount);

      const status = err?.response?.status;
      if (status === 401) alert("Сесія недійсна. Увійдіть знову.");
      else alert("Не вдалося оновити улюблені. Спробуйте пізніше.");
    } finally {
      setBusy(false);
    }
  };

  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openRecipe();
    }
  };

  return (
    <article
      className={s.card}
      onClick={openRecipe}
      onKeyDown={onKey}
      role="button"
      tabIndex={0}
    >
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
