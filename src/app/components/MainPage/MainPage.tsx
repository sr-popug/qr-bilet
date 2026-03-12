"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import circe from "../../fonts/fonts";
import TransportModal from "../TransportModal/TransportModal";
import styles from "./page.module.css";

interface TransportData {
  type: "Автобус" | "Троллейбус";
  number: string;
  vehicleId: string;
}

export default function MainPage() {
  const [seconds, setSeconds] = useState(0);
  const [paymentTimestamp, setPaymentTimestamp] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const [formData, setFormData] = useState<TransportData>({
    type: "Автобус",
    number: "",
    vehicleId: "",
  });

  // 1. Эффект для инициализации и работы таймера (запускается один раз)
  useEffect(() => {
    const initTimer = setTimeout(() => {
      setPaymentTimestamp(Date.now());
    }, 0);

    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => {
      clearTimeout(initTimer);
      clearInterval(interval);
    };
  }, []);

  // 2. НОВЫЙ ЭФФЕКТ: Следим за закрытием модального окна (isOpen)
  useEffect(() => {
    // Если isOpen стал false (модалка закрылась)
    if (!isOpen) {
      const resetTimer = setTimeout(() => {
        setSeconds(0); // Сбрасываем таймер на 00:00
        setPaymentTimestamp(Date.now()); // Обновляем дату оплаты на "сейчас"
      }, 0);

      return () => clearTimeout(resetTimer);
    }
  }, [isOpen]); // Эффект срабатывает каждый раз, когда меняется isOpen

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
        <div className={styles.price}>
          53
          <span> ₽</span>
        </div>
        <div className={styles.time}>{formattedTime}</div>
        <div className={styles.ts}>Т/С: {formData.vehicleId || "321"}</div>
        <div className={styles.moment}>С момента оплаты прошло:</div>
        <div onClick={handleTimeHack} className={styles.seconds}>
          {formatTime(seconds)}
        </div>
        <div className={styles.qrCode}>
          <Image
            src={"/qr-code.png"}
            width={500}
            height={500}
            alt={"qr-code"}
          />
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
