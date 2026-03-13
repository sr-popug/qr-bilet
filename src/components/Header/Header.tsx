import styles from "./header.module.css";

export default function Header({ text }: { text: string }) {
  return (
    <div className={styles.header}>
      <h1>{text}</h1>
    </div>
  );
}
