import React, { useMemo } from "react";

export default function RecipePagination({
  current = 1,
  pages = 1,
  onChange,
  disabled = false,
  siblingCount = 1,
}) {
  const items = useMemo(() => {
    if (!pages || pages <= 1) return [];

    const out = [];
    const pushRange = (start, end) => {
      for (let i = start; i <= end; i++) out.push(i);
    };

    const showLeftDots = current - siblingCount > 2;
    const showRightDots = current + siblingCount < pages - 1;

    out.push(1);

    const left = Math.max(2, current - siblingCount);
    const right = Math.min(pages - 1, current + siblingCount);

    if (showLeftDots) out.push("…");
    pushRange(left, right);
    if (showRightDots) out.push("…");

    if (pages > 1) out.push(pages);
    return out;
  }, [current, pages, siblingCount]);

  if (items.length === 0) return null;

  const btn = {
    minWidth: 36,
    height: 36,
    borderRadius: 10,
    border: "1px solid #ddd",
    background: "#fff",
    margin: "12px 4px 0",
    cursor: "pointer",
  };

  const handleChange = (p) => {
    if (!onChange || disabled) return;
    if (p === current || p < 1 || p > pages) return;
    onChange(p);
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 4, marginTop: 12 }}
      role="navigation"
      aria-label="Pagination"
    >
      <button
        style={btn}
        disabled={disabled || current <= 1}
        onClick={() => handleChange(current - 1)}
        aria-label="Previous page"
      >
        ‹
      </button>

      {items.map((it, i) =>
        it === "…" ? (
          <span key={`dots-${i}`} style={{ padding: "0 6px", marginTop: 12 }}>
            …
          </span>
        ) : (
          <button
            key={it}
            style={{
              ...btn,
              background: it === current ? "#000" : "#fff",
              color: it === current ? "#fff" : "#000",
              borderColor: it === current ? "#000" : "#ddd",
            }}
            disabled={disabled || it === current}
            onClick={() => handleChange(it)}
            aria-current={it === current ? "page" : undefined}
            aria-label={`Page ${it}`}
          >
            {it}
          </button>
        )
      )}

      <button
        style={btn}
        disabled={disabled || current >= pages}
        onClick={() => handleChange(current + 1)}
        aria-label="Next page"
      >
        ›
      </button>
    </div>
  );
}