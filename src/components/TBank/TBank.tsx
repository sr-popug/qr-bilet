"use client";
import { tbank } from "@/app/fonts/fonts";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import TBankModal from "../TBankModal/TBankModal";
import styles from "./tbank.module.css";
export default function TBank() {
  const [visible, setVisible] = useState(false);
  return (
    <div className={`${styles.page} ${tbank.className}`}>
      <header>
        <Link href={"/"}>
          <Image
            src={"/left-arrow.png"}
            width={76}
            height={100}
            alt={"sbp"}
            className={styles.arrow}
          />
        </Link>
        <h1>Операции</h1>
        <Image
          src={"/header-graf.png"}
          width={100}
          height={92}
          alt={"sbp"}
          className={styles.graf}
        />
      </header>

      <div className={styles.search}>
        <Image src={"/search.png"} width={100} height={100} alt={"sbp"} />
        Поиск
      </div>

      <div className={styles.filters}>
        <div className={styles.filter}>
          Tinkoff Black
          <Image src={"/arrow-down.png"} width={32} height={32} alt='filt' />
        </div>
        <div className={styles.notactive}>Без переводов</div>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <p className={styles.money}>13 168 ₽</p>
          <p className={styles.data}>Траты</p>
          <Image src={"/trati.png"} width={250} height={30} alt={"sbp"} />
        </div>
        <div className={styles.stat}>
          <p className={styles.money}>11 625 ₽</p>
          <p className={styles.data}>Доходы</p>
          <Image src={"/dohodi.png"} width={250} height={30} alt={"sbp"} />
        </div>
      </div>

      <div className={styles.operation}>
        <div className={styles.left}>
          <Image src={"/rassrochka.png"} width={200} height={200} alt={"sbp"} />
          <div className={styles.info}>
            <h3>Доступна рассрочка</h3>
            <p>Для 6 покупок на сумму 5 106,56 ₽</p>
          </div>
        </div>
      </div>

      <h2 className={styles.today}>Сегодня</h2>

      <div
        className={styles.operation}
        onClick={() => setVisible(prev => !prev)}
      >
        <div className={styles.left}>
          <Image src={"/transport.png"} width={250} height={250} alt={"sbp"} />
          <div className={styles.info}>
            <h3>Транспорт</h3>
            <p>Местный транспорт</p>
          </div>
        </div>
        <div className={styles.moneys}>
          <div>−53 ₽ </div>
          <p>Tinkoff Black</p>
        </div>
      </div>

      <div className={styles.operation}>
        <div className={styles.left}>
          <Image src={"/magnit.png"} width={250} height={250} alt={"sbp"} />
          <div className={styles.info}>
            <h3>Магнит</h3>
            <p>Супермаркеты</p>
          </div>
        </div>
        <div className={styles.moneys}>
          <div>−368,79 ₽ </div>
          <p>Tinkoff Black</p>
        </div>
      </div>

      <div className={styles.operation}>
        <div className={styles.left}>
          <Image src={"/sberbank.png"} width={250} height={250} alt={"sbp"} />
          <div className={styles.info}>
            <h3>Елена Ц.</h3>
            <p>Переводы</p>
          </div>
        </div>
        <div className={styles.moneys}>
          <div style={{ color: "#00B92D" }}>+1 300 ₽ </div>
          <p>Tinkoff Black</p>
        </div>
      </div>
      <div className={styles.operation}>
        <div className={styles.left}>
          <Image src={"/magnit.png"} width={250} height={250} alt={"sbp"} />
          <div className={styles.info}>
            <h3>Магнит</h3>
            <p>Супермаркеты</p>
          </div>
        </div>
        <div className={styles.moneys}>
          <div>−720,93 ₽ </div>
          <p>Tinkoff Black</p>
        </div>
      </div>
      <h2 className={styles.today}>Вчера</h2>
      <div className={styles.operation}>
        <div className={styles.left}>
          <Image src={"/magnit.png"} width={250} height={250} alt={"sbp"} />
          <div className={styles.info}>
            <h3>Магнит</h3>
            <p>Супермаркеты</p>
          </div>
        </div>
        <div className={styles.moneys}>
          <div>−345,11 ₽ </div>
          <p>Tinkoff Black</p>
        </div>
      </div>
      {visible && <TBankModal visbible={visible} setVisible={setVisible} />}
    </div>
  );
}
