import { Field } from "formik";
import styles from "./TextareaInput.module.css";
import { useEffect, useRef } from "react";

const TextareaInput = ({
  name,
  placeholder,
  maxLength,
  value,
  className,
  error,
  touched,
}) => {
  const textareaRef = useRef();
  const safeValue = value || "";

  useEffect(() => {
    if (!textareaRef.current) return;
    if (safeValue.length === 0) {
      textareaRef.current.style.height = "40px";
    } else {
      textareaRef.current.style.height = "40px";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [safeValue]);

  return (
    <div className={styles.wrapper}>
      <Field
        as="textarea"
        innerRef={textareaRef}
        className={`${styles.textarea} ${className || ""}`}
        name={name}
        maxLength={maxLength}
        placeholder={placeholder}
        value={safeValue}
      />

      {error && touched && <div className={styles.error}>{error}</div>}

      {maxLength && (
        <span className={styles.counter}>
          {safeValue.length}/{maxLength}
        </span>
      )}
    </div>
  );
};

export default TextareaInput;
