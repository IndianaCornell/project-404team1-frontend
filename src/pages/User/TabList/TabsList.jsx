import { Link, useLocation } from "react-router-dom";

import styles from "./TabsList.module.css";

const tabs = {
  owner: [
    { title: "My recipes", path: "recipes" },
    { title: "My favorites", path: "favorites" },
    { title: "Followers", path: "followers" },
    { title: "Following", path: "following" },
  ],
  user: [
    { title: "recipes", path: "recipes" },
    { title: "followers", path: "followers" },
  ],
};

const TabsList = ({ isOwner }) => {
  const { pathname } = useLocation();
  const parts = pathname.split("/");
  const userId = parts[2];

  const getPath = (path) => {
    const currentPath = parts[3] || "";
    if (!currentPath && path === "recipes") {
      return true;
    }
    return currentPath === path;
  };

  return (
    <div className={styles.wrapper}>
      <ul className={styles.tabs}>
        {(isOwner ? tabs.owner : tabs.user).map((tab) => (
          <Tab
            key={tab.title}
            title={tab.title}
            path={`/user/${userId}/${tab.path}`}
            active={getPath(tab.path)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TabsList;

const Tab = ({ title, path, active }) => {
  return (
    <li className={`${styles.tab} ${active ? styles.active : ""}`}>
      <Link to={path} className={styles.link}>
        {title}
      </Link>
    </li>
  );
};
