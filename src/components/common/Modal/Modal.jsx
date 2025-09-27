import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (!isOpen) return;
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="relative bg-white rounded-2xl shadow-xl w-[90vw] max-w-md p-6"
        role="dialog"
        aria-modal="true"
      >
        {title ? (
          <h3 className="text-lg font-semibold mb-4">{title}</h3>
        ) : null}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-700"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
