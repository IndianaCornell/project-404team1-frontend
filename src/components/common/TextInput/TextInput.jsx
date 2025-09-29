import { Field } from "formik";
import styles from "./TextInput.module.css";

const TextInput = ({
  name,
  placeholder,
  maxLength,
  showCounter,
  value,
  className,
}) => {
  return (
    <div className={`${styles.inputWrapper} ${className || ""}`}>
      <Field
        className={styles.input}
        name={name}
        maxLength={maxLength}
        placeholder={placeholder}
      />
      {showCounter && (
        <span className={styles.counter}>
          {value.length}/{maxLength}
        </span>
      )}
    </div>
  );
};

export default TextInput;
