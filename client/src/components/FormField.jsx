import React from "react";
import { FiAlertCircle } from "react-icons/fi";

export default function FormField({
  label,
  name,
  required = false,
  error,
  touched,
  maxLength,
  value,
  as = "input",
  ...rest
}) {
  const showError = Boolean(touched && error);
  const Component = as === "textarea" ? "textarea" : "input";

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <label htmlFor={name} className="text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-danger ml-0.5">*</span>}
        </label>
        {maxLength && (
          <span
            className={`text-xs tabular-nums ${
              value.length >= maxLength ? "text-danger font-medium" : "text-slate-400"
            }`}
          >
            {value.length} / {maxLength}
          </span>
        )}
      </div>

      <Component
        id={name}
        name={name}
        value={value}
        maxLength={maxLength}
        aria-invalid={showError}
        aria-describedby={showError ? `${name}-error` : undefined}
        className={`input-base ${as === "textarea" ? "min-h-[88px] resize-y" : ""} ${
          showError ? "border-danger focus:border-danger focus:ring-red-100" : ""
        }`}
        {...rest}
      />

      {showError && (
        <p id={`${name}-error`} role="alert" className="flex items-center gap-1.5 text-xs font-medium text-danger">
          <FiAlertCircle size={13} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
