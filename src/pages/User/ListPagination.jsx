import { useMemo } from "react";

function PageButton({ children, active, disabled, onClick, ariaLabel }) {
  return (
    <button
      type="button"
      className={`page${active ? " active" : ""}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </button>
  );
}

/**
 * Простой диапазон: 1 ... pages (без многоточий).
 */
export default function ListPagination({ page, pages, onPage }) {
  const numbers = useMemo(
    () => Array.from({ length: pages }, (_, i) => i + 1),
    [pages]
  );

  if (!pages || pages <= 1) return null;

  const toPrev = () => page > 1 && onPage(page - 1);
  const toNext = () => page < pages && onPage(page + 1);

  return (
    <nav className="pagination" role="navigation" aria-label="Pagination">
      <PageButton
        ariaLabel="Previous page"
        disabled={page <= 1}
        onClick={toPrev}
      >
        ‹
      </PageButton>

      {numbers.map((n) => (
        <PageButton
          key={n}
          active={n === page}
          onClick={() => onPage(n)}
          ariaLabel={`Page ${n}`}
        >
          {n}
        </PageButton>
      ))}

      <PageButton
        ariaLabel="Next page"
        disabled={page >= pages}
        onClick={toNext}
      >
        ›
      </PageButton>
    </nav>
  );
}
