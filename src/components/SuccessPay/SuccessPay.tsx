"use client";
import { tbank } from "@/app/fonts/fonts";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CheckPage from "../CheckPage/CheckPage";
import styles from "./success.module.css";

export default function SuccessPay() {
  const [throttled, setThrottled] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setThrottled(true);
    }, 1800);
  }, []);

  if (!throttled) {
    return <CheckPage />;
  } else {
    return (
      <div className={`${styles.page} ${tbank.className}`}>
        <div className={styles.top}>
          <Link href={"/pay"}>Закрыть</Link>
        </div>
        <div className={styles.main}>
          <Image
            src='/success.png'
            width={80}
            height={80}
            className={styles.successImg}
            alt='success'
          />
          <p className={styles.text1}>Транспорт</p>
          <p className={styles.text2}>Местный транспорт</p>
          <div className={styles.sbp}>
            <Image src='/sbp-m.svg' width={16} height={16} alt='sbp' /> СБП
          </div>
          <strong>- 53 ₽</strong>
          <div className={styles.kvit}>
            <Image src='/kvit.png' width={18} height={24} alt='sbp' />
            <p>Квитанция</p>
          </div>
          <h2>Перевод со счета</h2>
          <div className={styles.operation}>
            <div className={styles.left}>
              <Image src={"/rubl.png"} width={200} height={200} alt={"sbp"} />
              <div className={styles.info}>
                <h3>Tinkoff Black</h3>

                <p>
                  <span>15 106,56 ₽</span>
                  <Image
                    src={"/arrow-pay.png"}
                    width={40}
                    height={20}
                    alt='img'
                  />
                  15 053,56 ₽
                </p>
              </div>
            </div>
          </div>
          <div className={styles.cont}>
            <Link className={styles.go} href={"/paided"}>
              Вернуться в магазин
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
