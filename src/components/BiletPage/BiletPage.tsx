"use client";
import { useTimeStore } from "@/store/TimeContenxt";
import { Inter } from "next/font/google";
import QRCode from "../QRCode/QRCode";
import styles from "./bilet.module.css";
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});
export default function BiletPage() {
  const { paymentTimestamp, formData } = useTimeStore();

  const paymentDate = new Date(paymentTimestamp!);
  const pad = (num: number) => num.toString().padStart(2, "0");
  const day = pad(paymentDate.getDate());
  const month = pad(paymentDate.getMonth() + 1);
  const year = paymentDate.getFullYear();
  const hours = pad(paymentDate.getHours());
  const minutes = pad(paymentDate.getMinutes());

  const formattedTime = `${day}.${month}.${year} ${hours}:${minutes}`;

  return (
    <div className={`${styles.bilet} ${inter.className}`}>
      <p className={styles.topData}>{formattedTime}</p>
      <div className={styles.data}>
        <h2>Вид билета</h2>
        <p>Разовый билет (QR) в Мурманске</p>
      </div>
      <div className={styles.data}>
        <h2>Серия билета</h2>
        <p>QR200067000141</p>
      </div>
      <div className={styles.data}>
        <h2>Номер билета</h2>
        <p>{year + month + day + 190609462}</p>
      </div>
      <div className={styles.data}>
        <h2>ИНН перевозчика</h2>
        <p>5190193597</p>
      </div>

      <div className={styles.data}>
        <h2>Наименование перевозчика</h2>
        <p>АО Электротранспорт города Мурманск</p>
      </div>
      <div className={styles.data}>
        <h2>Вид транспорта</h2>
        <p>{formData.type}</p>
      </div>
      <div className={styles.data}>
        <h2>Маршрут/Станция</h2>
        <p>{formData.number}</p>
      </div>
      <div className={styles.data}>
        <h2>Номер ТС</h2>
        <p>{formData.vehicleId}</p>
      </div>
      <div className={styles.data}>
        <h2>Дата и время поездки</h2>
        <p>{formattedTime}</p>
      </div>
      <div className={styles.data}>
        <h2>Стоимость</h2>
        <p>53.0 руб.</p>
      </div>
      <div className={styles.qrcode}>
        <QRCode />
      </div>
    </div>
  );
}
