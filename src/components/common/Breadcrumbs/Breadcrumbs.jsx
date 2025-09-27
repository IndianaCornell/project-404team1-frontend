import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";

const Breadcrumbs = () => {
  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/" className={styles.link}>
        Home
      </Link>
      <span className={styles.separator}>/</span>
      <span className={styles.current}>Add Recipe</span>
    </nav>
  );
};

export default Breadcrumbs;
