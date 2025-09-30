import { Button } from '../../ui/Button.jsx';
import Modal from '../Modal/Modal.jsx';
import styles from './LogOutModal.module.css';

const LogOutModal = ({ isOpen, onCancel, onSuccess }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onCancel}>
      <div className={styles.signUpWrapper}>
        <h2 className={styles.title}>Are you logging out?</h2>
        <h2 className={styles.titleSmall}>Log out</h2>
        <h2 className={styles.textContainer}>
          You can always log back in at any time.
        </h2>
        <div className={styles.btnWraper}>
          <Button className={styles.button} onClick={onSuccess}>
            log out
          </Button>
          <Button
            className={styles.button}
            onClick={onCancel}
            variant={'outline'}
          >
            cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LogOutModal;
