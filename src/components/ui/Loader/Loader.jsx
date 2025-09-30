import styles from './Loader.module.css';

export const PageLoader = () => {
  return (
    <div className={styles.loader}>
      <Loader />
    </div>
  );
};

export const Loader = () => {
  return <div className={styles.loader__spinner}></div>;
};
