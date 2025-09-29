import { useDispatch, useSelector } from "react-redux";
import { removeNotification } from "../../../redux/slices/notificationsSlice";
import styles from "./Notification.module.css";

const Notification = () => {
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );
  const dispatch = useDispatch();

  return (
    <div className={styles.wrapper}>
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`${styles.notification} ${styles[n.type]}`}
          onClick={() => dispatch(removeNotification(n.id))}
        >
          {n.message}
        </div>
      ))}
    </div>
  );
};

export default Notification;
