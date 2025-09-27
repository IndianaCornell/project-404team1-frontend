import { Field } from "formik";
import styles from "./TextareaInput.module.css";
import { useEffect, useRef } from "react";

const TextareaInput = ({ name, placeholder, maxLength, value, className }) => {
  const textareaRef = useRef();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [value]);

  return (
    <div className={styles.wrapper}>
      <Field
        as="textarea"
        innerRef={textareaRef}
        className={`${styles.textarea} ${className || ""}`}
        name={name}
        maxLength={maxLength}
        placeholder={placeholder}
      />
      {maxLength && (
        <span className={styles.counter}>
          {value.length}/{maxLength}
        </span>
      )}
    </div>
  );
};

export default TextareaInput;
