import { Link } from "react-router-dom";
import {
  useDeleteRecipeMutation,
  useDeleteFromFavoritesMutation,
} from "@/lib/api";

const fallbackImage = "/images/placeholder-recipe.png";

export default function RecipePreview({ item, tabKey = "my" }) {
  const [deleteMine, { isLoading: delMinePending }] = useDeleteRecipeMutation();
  const [deleteFav,  { isLoading: delFavPending  }] = useDeleteFromFavoritesMutation();

  const pending = delMinePending || delFavPending;
  const id = item?.id;

  const handleDelete = async () => {
    if (!id) return;
    // simple confirm — можно заменить на ваш Modal
    if (!window.confirm("Delete this recipe?")) return;

    try {
      if (tabKey === "my") await deleteMine(id).unwrap();
      else                 await deleteFav(id).unwrap();
      // Инвалидация тегов настроена в api.js
    } catch {
      // TODO: toast("Failed to delete the recipe")
    }
  };

  return (
    <article className="recipe-card" aria-busy={pending}>
      <img
        src={item?.image || fallbackImage}
        alt={item?.title || "Recipe image"}
        className="recipe-img"
        loading="lazy"
      />

      <div className="recipe-body">
        <h3 className="recipe-title">
          {(item?.title || "Recipe").toUpperCase()}
        </h3>

        <p className="recipe-desc">
          {item?.shortDescription || "No description provided."}
        </p>

        <div className="recipe-actions">
          <Link
            to={`/recipes/${id}`}
            aria-label="Open recipe"
            className="recipe-link"
            title="Open recipe"
          >
            {/* стрелка ↗ как SVG, чтобы не прыгала типографика */}
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </Link>

          <button
            type="button"
            onClick={handleDelete}
            disabled={pending || !id}
            className="recipe-delete"
            aria-label="Delete recipe"
            title="Delete recipe"
            aria-disabled={pending || !id}
          >
            {/* иконка корзины как SVG */}
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 6h18M9 6V4h6v2M7 6l1 14h8l1-14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
