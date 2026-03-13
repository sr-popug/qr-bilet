import Image from "next/image";
import Link from "next/link";
import { banks } from "./banks";
import styles from "./styles/sbp-menu.module.css";
export default function SBPMenu({
  setVisible,
}: {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className={styles.menu}>
      <div className={styles.top} onClick={() => setVisible(false)}>
        <Image
          src={"/arrow-left-sbp.png"}
          height={18}
          width={22}
          alt={"arrow"}
        />
        <p>Вернуться</p>
      </div>
      <div className={styles.head}>
        <div className={styles.about}>
          <Image src={"/sbp-m.svg"} width={45} height={45} alt={"sbp"} />
        </div>
        <p>Система быстрых платежей</p>
      </div>
      <div className={styles.search}>Поиск</div>
      <div className={styles.items}>
        {banks.map((bank, index) => (
          <Link href={bank.link || "#"} key={index} className={styles.el}>
            <div className={styles.left}>
              <div className={styles.about}>
                <Image
                  src={`/banks/${bank.image}`}
                  width={45}
                  height={45}
                  alt={"sbp"}
                />
              </div>
              <p>{bank.title}</p>
            </div>
            <Image
              src={"/arrow-right.png"}
              width={18}
              height={18}
              alt={"arrow"}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
