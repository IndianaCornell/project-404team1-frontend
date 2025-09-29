import styles from "./CookingTimeSelector.module.css";
import { useState } from "react";

const CookingTimeSelector = ({ time, onDecrease, onIncrease, label }) => {
  const [touched, setTouched] = useState(false);

  const handleDecrease = () => {
    setTouched(true);
    onDecrease();
  };

  const handleIncrease = () => {
    setTouched(true);
    onIncrease();
  };

  return (
    <div className={styles.fieldGroup}>
      <label className={styles.fieldLabel}>{label}</label>
      <div className={styles.cookingTime}>
        <button
          type="button"
          className={styles.roundButton}
          onClick={handleDecrease}
        >
          <span>-</span>
        </button>
        <span className={`${styles.timeText} ${touched ? styles.active : ""}`}>
          {time} min
        </span>
        <button
          type="button"
          className={styles.roundButton}
          onClick={handleIncrease}
        >
          <span>+</span>
        </button>
      </div>
    </div>
  );
};

export default CookingTimeSelector;
