import React, { useState } from "react";

const COLORS = {
  view: "text-slate-500 hover:text-primary-600 hover:bg-primary-50",
  edit: "text-slate-500 hover:text-amber-600 hover:bg-amber-50",
  delete: "text-slate-500 hover:text-danger hover:bg-red-50",
};

const IconButton = React.memo(function IconButton({
  icon: Icon,
  label,
  tone = "view",
  onClick,
  disabled = false,
  loading = false,
}) {
  const [hover, setHover] = useState(false);

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-label={label}
        onClick={onClick}
        disabled={disabled || loading}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        className={`h-9 w-9 inline-flex items-center justify-center rounded-control transition-colors duration-150
          disabled:opacity-40 disabled:cursor-not-allowed ${COLORS[tone]}`}
      >
        {loading ? (
          <span className="h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
        ) : (
          <Icon size={16} aria-hidden="true" />
        )}
      </button>
      {hover && !disabled && !loading && (
        <span
          role="tooltip"
          className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap
            rounded-md bg-slate-800 px-2 py-1 text-[11px] font-medium text-white animate-fadeIn z-10"
        >
          {label}
        </span>
      )}
    </span>
  );
});

export default IconButton;
