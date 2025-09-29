import RecipePreview from "./RecipePreview";
import UserCard from "./UserCard";

export default function ListItems({ tab, items, onRemoved }) {
  if (tab === "my" || tab === "favorites") {
    return (
      <div>
        {items.map(it => (
          <RecipePreview key={it.id} item={it} tab={tab} onRemoved={onRemoved} />
        ))}
        {items.length === 0 && <div className="empty-state">Nothing here yet</div>}
      </div>
    );
  }
  const context = tab; // followers | following
  return (
    <div>
      {items.map(u => (
        <UserCard key={u.id} user={u} context={context} onRemoved={onRemoved} />
      ))}
      {items.length === 0 && <div className="empty-state">No users yet</div>}
    </div>
  );
}
