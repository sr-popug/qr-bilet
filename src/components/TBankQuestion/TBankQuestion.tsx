"use client";
import { tbank } from "@/app/fonts/fonts";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CheckPage from "../CheckPage/CheckPage";
import styles from "./tbank.module.css";

export default function TBankQuestion() {
  const [throttled, setThrottled] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setThrottled(true);
    }, 1000);
  }, []);

  if (!throttled) {
    return <CheckPage />;
  } else {
    return (
      <div className={`${styles.page} ${tbank.className}`}>
        <Image
          src='/tbank-logo.png'
          className={styles.topLogo}
          width={72}
          height={24}
          alt='logo'
        />
        <div className={styles.mainContent}>
          <Image
            src='/question.png'
            width={500}
            height={500}
            alt='logo'
            className={styles.mainImage}
          />
          <p className={styles.question}>Где хотите продолжить?</p>
          <button className={tbank.className}>В приложении банка</button>
          <Link href={"/pay"}>Здесь, в браузере</Link>
        </div>
      </div>
    );
  }
}
