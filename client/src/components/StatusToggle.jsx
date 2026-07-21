import React from "react";

export default function StatusToggle({ value, onChange, name = "status" }) {
  const options = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-slate-700">Status</span>
      <div
        role="radiogroup"
        aria-label="User status"
        className="inline-flex w-full rounded-control border border-slate-200 bg-slate-50 p-1 sm:w-auto"
      >
        {options.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange({ target: { name, value: opt.value } })}
              className={`flex-1 sm:flex-none rounded-[8px] px-4 py-1.5 text-sm font-medium transition-all duration-150
                ${
                  isSelected
                    ? opt.value === "active"
                      ? "bg-emerald-500 text-white shadow-soft"
                      : "bg-slate-500 text-white shadow-soft"
                    : "text-slate-500 hover:text-slate-700"
                }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
