"use client";
import { leto } from "@/app/fonts/fonts";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import SBPLoader from "../SBPLoader/SBPLoader";
import SBPMenu from "./SBPMenu";
import styles from "./styles/paid.module.css";
export default function GetPaidPage() {
  const [throttled, setThrottled] = useState(false);
  const [isVisibleSBPMenu, setIsVisibleSBPMenu] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setThrottled(true);
    }, 800);
  }, []);

  function startPay() {
    setIsVisibleSBPMenu(prev => !prev);
  }

  if (throttled) {
    return (
      <div className={`${styles.paid} ${leto.className}`}>
        <div className={styles.bg}>
          <Image src={"/bg-dark.png"} width={560} height={135} alt={"bg"} />
        </div>
        <div className={`${styles.topInfo}`}>
          <p className={styles.price}>
            53,00 <span>₽</span>
          </p>
          <p>ОПЛАТА ПРОЕЗДА НА BILET...</p>
        </div>
        <div className={styles.main}>
          <h1>Выберите способ оплаты</h1>
          <div className={styles.el} onClick={startPay}>
            <div className={styles.left}>
              <div className={styles.about}>
                <Image src={"/sbp-m.svg"} width={40} height={40} alt={"sbp"} />
              </div>
              <p>Система быстрых платежей</p>
            </div>
            <Image
              src={"/arrow-right.png"}
              width={20}
              height={20}
              alt={"arrow"}
            />
          </div>
          <div className={styles.el}>
            <div className={styles.left}>
              <div className={styles.about}>
                <Image src={"/bnpl.svg"} width={40} height={40} alt={"sbp"} />
              </div>
              <p>Оплата частями</p>
            </div>
            <Image
              src={"/arrow-right.png"}
              width={20}
              height={20}
              alt={"arrow"}
            />
          </div>
        </div>
        {isVisibleSBPMenu && <SBPMenu setVisible={setIsVisibleSBPMenu} />}
      </div>
    );
  } else {
    return (
      <div className={styles.throttled}>
        <Header text='Оплата проезда' />
        <Link href='/paided' className={styles.sbp}>
          <Image src={"/sbp.svg"} width={176} height={80} alt={"sbp"} />
        </Link>
        <SBPLoader />
        <p>Ожидаем оплаты</p>
      </div>
    );
  }
}
