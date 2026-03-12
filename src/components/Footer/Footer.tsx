"use client";
import { useTimeStore } from "@/store/TimeContenxt";
import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  const { paymentTimestamp } = useTimeStore();

  const paymentDate = new Date(paymentTimestamp!);

  const pad = (num: number) => num.toString().padStart(2, "0");
  const day = pad(paymentDate.getDate());
  const month = pad(paymentDate.getMonth() + 1);
  const year = paymentDate.getFullYear();

  return (
    <div className={styles.footer}>
      <div className={styles.text}>
        <div className={styles.number}>
          Серия билета: <span>QR200067000141</span>
        </div>
        <div className={styles.number}>
          Номер билета: <span>{year + month + day + 190609462}</span>
        </div>
      </div>
      <div className={styles.text}>
        <p>Предъявите контролеру QR-код.</p>
        <p>Чтобы сохранить реквизиты билета, нажмите кнопку «Скачать»</p>
      </div>
      <Link href={"/bilet"}>Скачать билет</Link>
    </div>
  );
}
