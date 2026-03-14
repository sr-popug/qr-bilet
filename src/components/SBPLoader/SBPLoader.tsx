import styles from "./loader.module.css";

export default function SBPLoader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loaderFill}></div>
    </div>
  );
}
