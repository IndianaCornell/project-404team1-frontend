import React from "react";

export default function Pagination({ page = 1, perPage = 10, total = 0, onPageChange }) {
  if (!total || total <= perPage) return null;

  const totalPages = Math.ceil(total / perPage);

  const go = (p) => () => {
    if (p !== page && typeof onPageChange === "function") onPageChange(p);
  };

  // простий варіант без вікон/елліпсів
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-2 mt-6" aria-label="Pagination">
      <button
        onClick={go(Math.max(1, page - 1))}
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
          className={`px-3 py-1 rounded ${p === page ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"}`}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </button>
      ))}

      <button
        onClick={go(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
}
