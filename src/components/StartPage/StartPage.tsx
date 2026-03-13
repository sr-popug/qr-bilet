"use client";
import circe from "@/app/fonts/fonts";
import { useTimeStore } from "@/store/TimeContenxt";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import TransportModal from "../TransportModal/TransportModal";
import styles from "./page.module.css";

export default function StartPage() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const {
    setSeconds,
    paymentTimestamp,
    setPaymentTimestamp,
    formData,
    setFormData,
  } = useTimeStore();

  useEffect(() => {
    if (!isOpen) {
      const resetTimer = setTimeout(() => {
        setSeconds(0);
        setPaymentTimestamp(Date.now());
      }, 0);
      return () => clearTimeout(resetTimer);
    }
  }, [isOpen, setSeconds, setPaymentTimestamp]);
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
      <Link href='/paided' className={styles.sbp}>
        <Image src={"/sbp.svg"} width={176} height={80} alt={"sbp"} />
      </Link>
      <div className={styles.mainContent}>
        <b className={`${styles.busNumber} ${circe.className}`}>
          {formData.type}: №{formData.number}
        </b>
        <Link href={"/tbank"} className={styles.price}>
          53
          <span> ₽</span>
        </Link>
        <div className={styles.time}>{formattedTime}</div>
        <div className={styles.ts}>Т/С: {formData.vehicleId || "321"}</div>
      </div>
      <Link className={styles.btn} href={"/get-paid"}>
        Оплатить
      </Link>

      <TransportModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}
