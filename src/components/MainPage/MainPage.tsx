"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import circe from "../../app/fonts/fonts";
import TransportModal from "../TransportModal/TransportModal";
import styles from "./page.module.css";
// Импортируем наш глобальный хук (путь может отличаться)
import Link from "next/link";
import { useTimeStore } from "../../store/TimeContenxt";
import QRCode from "../QRCode/QRCode";

export default function MainPage() {
  // 1. Достаем formData и setFormData из глобального контекста
  const {
    seconds,
    setSeconds,
    paymentTimestamp,
    setPaymentTimestamp,
    formData,
    setFormData,
  } = useTimeStore();

  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    if (!isOpen) {
      const resetTimer = setTimeout(() => {
        setSeconds(0);
        setPaymentTimestamp(Date.now());
      }, 0);
      return () => clearTimeout(resetTimer);
    }
  }, [isOpen, setSeconds, setPaymentTimestamp]);

  const handleTimeHack = () => {
    setSeconds(prev => prev + 10);
    setPaymentTimestamp(prev => (prev ? prev - 10000 : null));
  };

  if (!paymentTimestamp) {
    return <div className={styles.page}></div>;
  }

  const paymentDate = new Date(paymentTimestamp);

  const pad = (num: number) => num.toString().padStart(2, "0");
  const day = pad(paymentDate.getDate());
  const month = pad(paymentDate.getMonth() + 1);
  const year = paymentDate.getFullYear();
  const hours = pad(paymentDate.getHours());
  const minutes = pad(paymentDate.getMinutes());

  const formattedTime = `${day}.${month}.${year} ${hours}:${minutes}`;

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={styles.page}>
      <div className={styles.sbp}>
        <Image src={"/sbp.svg"} width={176} height={80} alt={"sbp"} />
      </div>
      <div className={styles.mainContent}>
        <p>Ваш проезд успешно оплачен!</p>
        <b className={`${styles.busNumber} ${circe.className}`}>
          {formData.type}: №{formData.number}
        </b>
        <Link href={"/tbank"} className={styles.price}>
          53
          <span> ₽</span>
        </Link>
        <div className={styles.time}>{formattedTime}</div>
        <div className={styles.ts}>Т/С: {formData.vehicleId || "321"}</div>
        <div className={styles.moment}>С момента оплаты прошло:</div>
        <div onClick={handleTimeHack} className={styles.seconds}>
          {formatTime(seconds)}
        </div>
        <div className={styles.qrCode}>
          <QRCode color={"f5f1e8"} />
        </div>
      </div>

      <TransportModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}
