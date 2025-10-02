import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { logoutUser } from "@/redux/slices/authOperations";
import { showNotification } from "@/redux/slices/notificationsSlice";
import styles from "./Modal.module.css";

export default function LogOutModal({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(
        showNotification({ type: "info", message: "You have been logged out" })
      );
    } catch (err) {
      dispatch(showNotification({ type: "error", message: String(err) }));
    } finally {
      navigate("/"); // HomePage
      onClose();
    }
  };

  return (
    <Modal title="Log out" onClose={onClose}>
      <p>Are you sure you want to log out?</p>
      <div className={styles.actions}>
        <button
          type="button"
          className="btn btn--outline btn--md"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn--primary btn--md"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </Modal>
  );
}
