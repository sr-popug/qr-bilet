"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import TransportModal from "./components/TransportModal/TransportModal";
import circe from "./fonts/fonts";
import styles from "./page.module.css";
interface TransportData {
  type: "Автобус" | "Троллейбус";
  number: string;
  vehicleId: string;
}

export default function Home() {
  const [seconds, setSeconds] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const [formData, setFormData] = useState<TransportData>({
    type: "Автобус",
    number: "",
    vehicleId: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const now = new Date();
  const pad = (num: number) => num.toString().padStart(2, "0");
  const day = pad(now.getDate());
  const month = pad(now.getMonth() + 1);
  const year = now.getFullYear();
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());

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
        <b className={styles.busNumber + `${circe.className}`}>
          {formData.type}: №{formData.number}
        </b>
        <div className={styles.price}>
          53
          <span> ₽</span>
        </div>
        <div className={styles.time}>{formattedTime}</div>
        <div className={styles.ts}>Т/С: {formData.vehicleId || "321"}</div>
        <div className={styles.moment}>С момента оплаты прошло:</div>
        <div className={styles.seconds}>{formatTime(seconds)}</div>
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
