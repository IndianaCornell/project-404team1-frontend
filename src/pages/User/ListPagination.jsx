export default function ListPagination({ page, perPage, total, onPage }) {
  const pages = Math.max(1, Math.ceil((total || 0) / (perPage || 1)));
  if (pages <= 1) return null;
  const nums = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <nav className="pagination" aria-label="pagination">
      {page > 1 && (
        <button onClick={() => onPage(page - 1)} aria-label="Previous page">
          ←
        </button>
      )}

      {nums.map((p) => (
        <button
          key={p}
          onClick={() => onPage(p)}
          disabled={p === page}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </button>
      ))}

      {page < pages && (
        <button onClick={() => onPage(page + 1)} aria-label="Next page">
          →
        </button>
      )}
    </nav>
  );
}
