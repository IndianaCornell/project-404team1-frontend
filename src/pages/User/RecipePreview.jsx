import { Link } from "react-router-dom";
import { useDeleteRecipeMutation, useDeleteFromFavoritesMutation } from "@/lib/api";

const FALLBACK = "/images/placeholder-recipe.png";

export default function RecipePreview({ item, tab, onRemoved }) {
  const [delMine, { isLoading: l1 }] = useDeleteRecipeMutation();
  const [delFav,  { isLoading: l2 }] = useDeleteFromFavoritesMutation();
  const pending = l1 || l2;

  const handleDelete = async () => {
    if (!window.confirm("Delete this recipe?")) return;
    if (tab === "my") await delMine({ id: item.id }).unwrap();
    else await delFav({ id: item.id }).unwrap();
    onRemoved?.(item.id);
  };

  return (
    <div className="recipe-row">
      <img className="recipe-thumb" src={item.image || FALLBACK} alt={item.title} />
      <div>
        <h3 className="recipe-title">{item.title}</h3>
        {item.description && <p className="recipe-desc">{item.description}</p>}
      </div>
      <div className="recipe-actions">
        <Link className="icon-btn" to={`/recipe/${item.id}`} aria-label="Open recipe">➡️</Link>
        <button className="icon-btn" onClick={handleDelete} disabled={pending} aria-label="Delete">🗑️</button>
      </div>
    </div>
  );
}
