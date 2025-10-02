import { useEffect, useRef } from "react";
import styles from "./Modal.module.css";

export default function Modal({ title, children, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);

    // Фокус всередину модалки
    const timer = setTimeout(() => {
      dialogRef.current
        ?.querySelector("button, input, a, textarea, [tabindex]")
        ?.focus?.();
    }, 0);

    return () => {
      document.removeEventListener("keydown", handleEsc);
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="document"
        ref={dialogRef}
      >
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
        {title && <h2 className={styles.title}>{title}</h2>}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
