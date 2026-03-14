"use client";
import { tbank } from "@/app/fonts/fonts";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CheckPage from "../CheckPage/CheckPage";
import styles from "./pay.module.css";
export default function Pay() {
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
        <div className={styles.top}>
          <Link href={"/get-paid/question"} className={styles.back}>
            <Image
              src={"/left-arrow.png"}
              width={76}
              height={100}
              alt={"sbp"}
              className={styles.arrow}
            />
          </Link>
          <Image
            src={"/sbp.svg"}
            width={64}
            height={34}
            alt={"sbp"}
            className={styles.sbp}
          />
          <div></div>
        </div>
        <div className={styles.data}>
          <p className={styles.under}>с Tinkoff Black</p>
          <strong>15 106,56 ₽</strong>
        </div>
        <div className={styles.address}>
          <p>Оплата проезда на bilet.nspk.ru</p>
          <Image src={"/address.png"} width={40} height={40} alt={"sbp"} />
        </div>
        <div className={styles.money}>
          <p>53 ₽</p>
          <Image src={"/lock.png"} width={13} height={16} alt={"sbp"} />
        </div>
        <p className={styles.desc}>Комиссия не взимается банком</p>
        <Link className={styles.pay} href={"/success-pay"}>
          Оплатить 53 ₽
        </Link>
      </div>
    );
  }
}
