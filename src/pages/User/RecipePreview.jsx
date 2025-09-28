import { Link } from "react-router-dom";
import {
  useDeleteRecipeMutation,
  useDeleteFromFavoritesMutation,
} from "@/lib/api";

const fallbackImage = "/images/placeholder-recipe.png";

export default function RecipePreview({ item, tabKey }) {
  const [delMine, { isLoading: delMinePending }] = useDeleteRecipeMutation();
  const [delFav,  { isLoading: delFavPending  }] = useDeleteFromFavoritesMutation();

  const handleDelete = async () => {
    if (!window.confirm("Delete this recipe?")) return;
    try {
      if (tabKey === "my") await delMine(item.id).unwrap();
      else                await delFav(item.id).unwrap();
    } catch {}
  };

  const pending = delMinePending || delFavPending;

  return (
    <article className="p-3 border rounded-lg bg-white">
      <img
        src={item.image || fallbackImage}
        alt={item.title}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="mt-2 font-semibold">{item.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">{item.shortDescription}</p>

      <div className="flex justify-between items-center mt-2">
        <Link to={`/recipes/${item.id}`} aria-label="Open recipe" className="text-gray-600 hover:text-black">
          →{/* стрелочка как в макете */}
        </Link>

        <button
          type="button"
          onClick={handleDelete}
          disabled={pending}
          className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-60"
          aria-label="Delete recipe"
          title="Delete"
        >
          🗑
        </button>
      </div>
    </article>
  );
}
