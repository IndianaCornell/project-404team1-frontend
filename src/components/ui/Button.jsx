import React from "react";

export default function Button({
  children,
  variant = "primary", // 'primary' | 'outline' | 'ghost'
  size = "md",         // 'sm' | 'md' | 'lg'
  className = "",
  ...props
}) {
  return (
    <button
      className={`btn btn--${variant} btn--${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}