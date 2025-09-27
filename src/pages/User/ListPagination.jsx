export default function ListPagination({ page = 1, perPage = 10, total = 0, onPageChange }) {
  if (!total || total <= perPage) return null;

  const totalPages = Math.ceil(total / perPage);
  const go = (p) => () => p !== page && onPageChange?.(p);

  // простая пагинация 1..N; при желании можно добавить "..." и окна
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-2 mt-6" aria-label="Pagination">
      <button
        onClick={go(page - 1)}
        disabled={page <= 1}
        className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        aria-label="Previous page"
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={go(p)}
          className={`px-3 py-1 rounded ${
            page === p ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"
          }`}
          aria-current={page === p ? "page" : undefined}
        >
          {p}
        </button>
      ))}

      <button
        onClick={go(page + 1)}
        disabled={page >= totalPages}
        className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
}
