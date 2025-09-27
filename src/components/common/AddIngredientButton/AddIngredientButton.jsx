import styles from "./AddIngredientButton.module.css";
import { FiPlus } from "react-icons/fi";

const AddIngredientButton = ({ onClick }) => {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      <span className={styles.text}>Add ingredient</span>
      <FiPlus className={styles.icon} />
    </button>
  );
};

export default AddIngredientButton;
