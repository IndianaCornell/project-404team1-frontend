import React from "react";
import CheckboxIcon from "@assets/icons/checkbox.svg?react";
import CheckboxActiveIcon from "@assets/icons/checkboxActive.svg?react";

export default function Checkbox({ checked, onChange, label, className }) {
  return (
    <label>
      <input
        name="checkbox"
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="sr-only peer"
      />
      {checked ? (
        <CheckboxActiveIcon className={className} width={20} height={20} />
      ) : (
        <CheckboxIcon className={className} width={20} height={20} />
      )}
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
}