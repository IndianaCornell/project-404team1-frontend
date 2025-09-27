import Button from "../../components/ui/Button.jsx";
import Icon from "../../components/ui/Icon.jsx";
import { Link } from "react-router-dom";
import {
  useDeleteRecipeMutation,
  useDeleteFromFavoritesMutation,
} from "../../lib/api";

const fallbackImage = "/images/placeholder-recipe.png";

export default function RecipePreview({ item, tabKey }) {
  const [delMine, { isLoading: delMinePending }] = useDeleteRecipeMutation();
  const [delFav, { isLoading: delFavPending }] = useDeleteFromFavoritesMutation();

  const handleDelete = async () => {
    if (!window.confirm("Delete this recipe?")) return;
    try {
      if (tabKey === "my") await delMine(item.id).unwrap();
      else await delFav(item.id).unwrap();
      // списки/лічильники оновляться через invalidatesTags
    } catch {}
  };

  const pending = delMinePending || delFavPending;

  return (
    <article className="card p-3 border rounded-lg bg-white">
      <img
        src={item.image || fallbackImage}
        alt={item.title}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="mt-2 font-semibold">{item.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">{item.shortDescription}</p>
      <div className="flex justify-between items-center mt-2">
        <Link to={`/recipes/${item.id}`} className="icon-link" aria-label="Open recipe">
          <Icon name="arrow-right" />
        </Link>
        <Button aria-label="Delete recipe" onClick={handleDelete} disabled={pending} variant="ghost">
          {pending ? <Icon name="loader" /> : <Icon name="trash" />}
        </Button>
      </div>
    </article>
  );
}
