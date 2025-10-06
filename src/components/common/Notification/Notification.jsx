import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeNotification } from "../../../redux/slices/notificationsSlice";
import styles from "./Notification.module.css";

const Notification = () => {
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );
  const dispatch = useDispatch();

  // Зберігаємо активні таймери поза Redux, у ref
  const timeouts = useRef({});

  useEffect(() => {
    notifications.forEach((n) => {
      // Якщо ще не створили таймер для цього ID
      if (!timeouts.current[n.id]) {
        const timeout = setTimeout(() => {
          dispatch(removeNotification(n.id));
          delete timeouts.current[n.id];
        }, n.autoClose || 1500); // 2 сек за замовчуванням

        timeouts.current[n.id] = timeout;
      }
    });

    // При анмаунті очищаємо всі таймери
    return () => {
      Object.values(timeouts.current).forEach(clearTimeout);
      timeouts.current = {};
    };
  }, [notifications, dispatch]);

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
