import React from "react";
import styles from "./Typography.module.css";

const Subtitle = ({ children }) => {
  return <p className={styles.subtitle}>{children}</p>;
};

export default Subtitle;
