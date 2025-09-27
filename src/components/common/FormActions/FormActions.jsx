import styles from "./FormActions.module.css";
import TrashIcon from "../../../assets/icons/trash.svg?react";

const FormActions = ({ onDelete, onSubmit }) => {
  return (
    <div className={styles.actions}>
      <button type="button" className={styles.delete} onClick={onDelete}>
        <TrashIcon className={styles.icon} />
      </button>
      <button type="submit" className={styles.publish} onClick={onSubmit}>
        Publish
      </button>
    </div>
  );
};

export default FormActions;
