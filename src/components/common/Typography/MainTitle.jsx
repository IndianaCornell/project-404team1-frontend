import React from "react";
import styles from "./Typography.module.css";

const MainTitle = ({ children }) => {
  return <h1 className={styles.mainTitle}>{children}</h1>;
};

export default MainTitle;
