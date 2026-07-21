import React from "react";
import { FiLoader } from "react-icons/fi";

const VARIANTS = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 shadow-soft hover:shadow-hover",
  secondary:
    "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
  danger: "bg-danger text-white hover:bg-red-600 shadow-soft hover:shadow-hover",
  ghost: "bg-transparent text-slate-500 hover:bg-slate-100",
};

const SIZES = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-sm",
};

const Button = React.memo(function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  loading = false,
  disabled = false,
  className = "",
  type = "button",
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`btn ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...rest}
    >
      {loading ? (
        <FiLoader className="animate-spin" aria-hidden="true" />
      ) : (
        Icon && <Icon aria-hidden="true" />
      )}
      {children}
    </button>
  );
});

export default Button;
