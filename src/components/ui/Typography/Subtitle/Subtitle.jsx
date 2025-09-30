import styles from './Subtitle.module.css';

const Subtitle = ({ text }) => {
  return <p className={styles.text}>{text}</p>;
};

export default Subtitle;
