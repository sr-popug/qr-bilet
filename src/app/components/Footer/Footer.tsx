import styles from "./footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.text}>
        <div className={styles.number}>
          Серия билета: <span>QR200067000141</span>
        </div>
        <div className={styles.number}>
          Номер билета: <span>20260305190609462</span>
        </div>
      </div>
      <div className={styles.text}>
        <p>Предъявите контролеру QR-код.</p>
        <p>Чтобы сохранить реквизиты билета, нажмите кнопку «Скачать»</p>
      </div>
      <button>Скачать билет</button>
    </div>
  );
}
