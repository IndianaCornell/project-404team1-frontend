import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";

const routeTitles = {
  "/": "Home",
  "/recipe/add": "Add Recipe",
  "/user": "User",
};

const Breadcrumbs = () => {
  const location = useLocation();

  const currentPath = location.pathname;

  const currentTitle =
    routeTitles[currentPath] ||
    currentPath.split("/").filter(Boolean).join(" / ");

  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/" className={styles.link}>
        Home
      </Link>
      <span className={styles.separator}>/</span>
      <span className={styles.current}>{currentTitle}</span>
    </nav>
  );
};

export default Breadcrumbs;
