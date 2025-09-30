export default function RecipeCard({ item, onDelete }) {
  return (
    <article className="recipe-card">
      <img src={item.image} alt={item.title} className="thumb" />
      <div className="body">
        <h4>{item.title}</h4>
        <p>{item.shortDescription}</p>
      </div>
      {onDelete && (
        <button onClick={() => onDelete(item.id)} className="btn-delete">
          Delete
        </button>
      )}
    </article>
  );
}