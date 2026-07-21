import React, { useMemo } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Builds a compact page list with ellipses, e.g. 1 … 4 5 [6] 7 8 … 12
function getPageList(current, total) {
  const pages = new Set([1, total, current, current - 1, current + 1]);
  return [...pages]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);
}

export default function Pagination({ page, totalPages, onChange }) {
  const pageList = useMemo(() => getPageList(page, totalPages), [page, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-1.5 py-2" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className="h-9 w-9 inline-flex items-center justify-center rounded-control text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <FiChevronLeft size={16} />
      </button>

      {pageList.map((p, idx) => {
        const prev = pageList[idx - 1];
        const showEllipsis = prev !== undefined && p - prev > 1;
        return (
          <React.Fragment key={p}>
            {showEllipsis && <span className="px-1 text-slate-400 text-sm">…</span>}
            <button
              type="button"
              onClick={() => onChange(p)}
              aria-current={p === page ? "page" : undefined}
              className={`h-9 min-w-9 px-3 inline-flex items-center justify-center rounded-control text-sm font-medium transition-colors
                ${p === page ? "bg-primary-600 text-white shadow-soft" : "text-slate-600 hover:bg-slate-100"}`}
            >
              {p}
            </button>
          </React.Fragment>
        );
      })}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className="h-9 w-9 inline-flex items-center justify-center rounded-control text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <FiChevronRight size={16} />
      </button>
    </nav>
  );
}
