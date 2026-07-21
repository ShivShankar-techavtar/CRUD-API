import React from "react";

export default function StatusBadge({ status, onClick, disabled = false }) {
  const isActive = status === "active";
  const classes = `inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-opacity
    ${isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}
    ${onClick ? "cursor-pointer hover:opacity-75" : ""}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  const dot = (
    <span
      className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-slate-400"}`}
      aria-hidden="true"
    />
  );

  if (!onClick) {
    return (
      <span className={classes}>
        {dot}
        {isActive ? "Active" : "Inactive"}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={`Click to mark as ${isActive ? "inactive" : "active"}`}
      className={classes}
    >
      {dot}
      {isActive ? "Active" : "Inactive"}
    </button>
  );
}
