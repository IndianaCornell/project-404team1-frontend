import styles from "./CookingTimeSelector.module.css";

const CookingTimeSelector = ({ time, onDecrease, onIncrease, label }) => {
  return (
    <div className={styles.fieldGroup}>
      <label className={styles.fieldLabel}>{label}</label>
      <div className={styles.cookingTime}>
        <button
          type="button"
          className={styles.roundButton}
          onClick={onDecrease}
        >
          <span>-</span>
        </button>
        <span className={styles.timeText}>{time} min</span>
        <button
          type="button"
          className={styles.roundButton}
          onClick={onIncrease}
        >
          <span>+</span>
        </button>
      </div>
    </div>
  );
};

export default CookingTimeSelector;
