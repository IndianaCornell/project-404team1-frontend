import React from "react";

export default function Segmented({ options, value, onChange }) {
  const leftActive = value === options[0].value;

  return (
    <div className="segment segment--2">
      <div
        className="segment__slider"
        data-pos={leftActive ? "left" : "right"}
        aria-hidden="true"
      />
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`segment__btn ${value === opt.value ? "segment__btn--active" : ""}`}
          onClick={() => onChange?.(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
