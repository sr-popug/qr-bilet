"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./tbank-modal.module.css";

import { useTimeStore } from "../../store/TimeContenxt";

const formatModalDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day} ${month} • ${hours}:${minutes}`;
};

export default function TBankModal({
  visbible,
  setVisible,
}: {
  visbible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // 1. Достаем formData (тип и номер) из нашего контекста
  const { paymentTimestamp, formData } = useTimeStore();

  if (!visbible) return null;

  const formattedDate = paymentTimestamp
    ? formatModalDate(paymentTimestamp)
    : "";

  const paymentDate = new Date(paymentTimestamp!);

  const pad = (num: number) => num.toString().padStart(2, "0");
  const day = pad(paymentDate.getDate());
  const month = pad(paymentDate.getMonth() + 1);
  const year = paymentDate.getFullYear();
  const hours = pad(paymentDate.getHours());
  const minutes = pad(paymentDate.getMinutes());

  const formattedTime = `${day}.${month}.${year} ${hours}:${minutes}`;

  return (
    <div className={styles.container}>
      <div className={styles.bg}></div>
      <div className={styles.modal}>
        <div className={styles.header}>
          <p className={styles.close} onClick={() => setVisible(false)}>
            Закрыть
          </p>
          <p className={styles.data}>{formattedDate}</p>
          <p></p>
        </div>
        <div className={styles.main}>
          <div className={styles.image}>
            <Image
              src={"/transport.png"}
              width={250}
              height={250}
              alt={"sbp"}
            />
          </div>
          <h3 className={styles.title}>Транспорт</h3>

          <div className={styles.infoTran}>
            {" "}
            <Image
              src={"/mini-bus.png"}
              width={50}
              height={50}
              alt={"sbp"}
              className={styles.bus}
            />
            Местный транспорт • MCC 4131
            <Image
              src={"/pen.png"}
              width={50}
              height={50}
              alt={"sbp"}
              className={styles.pen}
            />
          </div>

          <p className={styles.price}>−53 ₽</p>

          <div className={styles.flex}>
            <div className={styles.item}>
              <Image
                src={"/ne-uchitivat.png"}
                width={250}
                height={250}
                alt={"sbp"}
              />
              <p>Не учитывать</p>
            </div>
            <div className={styles.item}>
              <Image src={"/spor.png"} width={250} height={250} alt={"sbp"} />
              <p>Оспорить</p>
            </div>
            <div className={styles.item}>
              <Image src={"/delit.png"} width={250} height={250} alt={"sbp"} />
              <p>Разделить</p>
            </div>
          </div>

          <div className={styles.spravka}>
            <div className={styles.topflex}>
              <p>
                Покупка со счета{" "}
                <Image
                  src={"/sbp-m.svg"}
                  width={25}
                  height={25}
                  alt={"sbp"}
                />{" "}
              </p>
              <Link href={"/check"}>Справка</Link>
            </div>
            <div className={styles.operation}>
              <div className={styles.left}>
                <Image src={"/rubl.png"} width={200} height={200} alt={"sbp"} />
                <div className={styles.info}>
                  <h3>Tinkoff Black</h3>
                  <p>15 106,56 ₽</p>
                </div>
              </div>
              <div className={styles.moneys}>
                <Image
                  src={"/arrow-right.png"}
                  width={60}
                  height={60}
                  alt={"sbp"}
                />
              </div>
            </div>
          </div>
          <div className={styles.rek}>
            <h5>Реквизиты</h5>
            <p className={styles.title}>Назначение</p>
            <p className={styles.rekData}>Оплата поездки от {formattedTime},</p>

            {/* 2. Добавляем вывод типа транспорта и его номера */}
            <p className={styles.rekData}>
              {formData.type} №{formData.number}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
