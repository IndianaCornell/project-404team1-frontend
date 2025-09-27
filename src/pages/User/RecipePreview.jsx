import Button from "../../components/ui/Button.jsx";
import Icon from "../../components/ui/Icon.jsx";
import { Link } from "react-router-dom";
import { useDeleteRecipeMutation } from "../../lib/api";

const fallbackImage = "/images/placeholder-recipe.png";

export default function RecipePreview({ item, userId, tabKey }) {
  const [del, { isLoading }] = useDeleteRecipeMutation();

  const handleDelete = async () => {
    if (!window.confirm("Delete this recipe?")) return;
    try {
      await del({ recipeId: item.id, userId, tab: tabKey }).unwrap();
      // RTK Query invalidatesTags обновит список и счётчики
    } catch (_) {
      // TODO: добавить тост с ошибкой
    }
  };

  return (
    <article className="recipe-card flex items-start gap-3 border rounded p-3 bg-white">
      <img
        src={item.image || fallbackImage}
        alt={item.title}
        className="thumb w-24 h-24 object-cover rounded"
      />
      <div className="body flex-1">
        <h4 className="title font-semibold">{item.title}</h4>
        {item.shortDescription && (
          <p className="desc text-sm text-gray-600">{item.shortDescription}</p>
        )}
      </div>
      <div className="actions flex gap-2 items-center">
        <Link
          aria-label="Open recipe"
          to={`/recipe/${item.id}`}
          className="icon-link text-gray-500 hover:text-black"
        >
          <Icon name="arrow-right" />
        </Link>
        <Button
          aria-label="Delete recipe"
          onClick={handleDelete}
          disabled={isLoading}
          variant="ghost"
        >
          {isLoading ? <Icon name="loader" /> : <Icon name="trash" />}
        </Button>
      </div>
    </article>
  );
}
