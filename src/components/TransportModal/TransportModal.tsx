import React, { ChangeEvent, MouseEventHandler } from "react";
import styles from "./menu.module.css";

interface TransportData {
  type: "Автобус" | "Троллейбус";
  number: string;
  vehicleId: string;
}

const TransportModal = ({
  isOpen,
  setIsOpen,
  formData,
  setFormData,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formData: TransportData;
  setFormData: React.Dispatch<React.SetStateAction<TransportData>>;
}) => {
  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = e => {
    setIsOpen(false);
    if (!formData.vehicleId) {
      setFormData(prev => ({ ...prev, vehicleId: "321" }));
    }
  };

  if (!isOpen) return null;

  return (
    <div onClick={e => setIsOpen(false)} className={styles.overlay}>
      <div onClick={e => e.stopPropagation()} className={styles.modalContent}>
        <div className={styles.form}>
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label>Тип:</label>
              <select
                name='type'
                value={formData.type}
                onChange={handleChange}
                className={styles.input}
              >
                <option value='Автобус'>Автобус</option>
                <option value='Троллейбус'>Троллейбус</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label>Маршрут:</label>
              <input
                type='text'
                name='number'
                value={formData.number}
                onChange={handleChange}
                className={`${styles.input} ${styles.inputNumber}`}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Номер Т/С:</label>
            <input
              type='text'
              name='vehicleId'
              value={formData.vehicleId}
              onChange={handleChange}
              placeholder='трехзначное число на кабине водителя'
              className={styles.input}
            />
          </div>

          <button
            type='button'
            onClick={handleSubmit}
            className={styles.button}
          >
            Подтвердить
          </button>
        </div>
        <p
          className={styles.p}
        >{`Чтобы перейти в фейк ТБанк нажмите на "53 ₽"`}</p>
        <p
          className={styles.p}
        >{`Чтобы открыть билет нажмите на "Скачать билет"`}</p>
        <p
          className={styles.p}
        >{`Нажмите на время, чтобы увеличить на 10 сек`}</p>
      </div>
    </div>
  );
};

export default TransportModal;
