import React from "react";

const shimmerClass =
  "bg-[linear-gradient(90deg,#F1F5F9_25%,#E2E8F0_37%,#F1F5F9_63%)] bg-[length:400px_100%] animate-shimmer rounded";

export default function SkeletonTable({ rows = 6 }) {
  return (
    <div className="card overflow-hidden" aria-busy="true" aria-label="Loading users">
      <div className="divide-y divide-slate-100">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-6 py-4">
            <div className={`h-9 w-9 shrink-0 rounded-full ${shimmerClass}`} />
            <div className="flex-1 space-y-2">
              <div className={`h-3 w-1/3 ${shimmerClass}`} />
              <div className={`h-3 w-1/2 ${shimmerClass}`} />
            </div>
            <div className={`h-3 w-16 ${shimmerClass}`} />
            <div className={`h-8 w-24 ${shimmerClass}`} />
          </div>
        ))}
      </div>
      <span className="sr-only">Loading user data…</span>
    </div>
  );
}
