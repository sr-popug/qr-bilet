import React, { ChangeEvent, FormEvent } from "react";

interface TransportData {
  type: "Автобус" | "Троллейбус";
  number: string;
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
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.number.trim()) {
      alert("Введите номер!");
      return;
    }

    console.log("TS данные подтверждены:", formData);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label>Тип:</label>
          <select
            name='type'
            value={formData.type}
            onChange={handleChange}
            style={styles.input}
          >
            <option value='Автобус'>Автобус</option>
            <option value='Троллейбус'>Троллейбус</option>
          </select>

          <label>Номер:</label>
          <input
            type='text'
            name='number'
            value={formData.number}
            onChange={handleChange}
            placeholder='Напр. 42'
            style={styles.input}
          />

          <button type='submit' style={styles.button}>
            Подтвердить
          </button>
        </form>
      </div>
    </div>
  );
};

// Типизируем объект стилей (Record<string, React.CSSProperties>)
const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modal: {
    backgroundColor: "#222",
    color: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "320px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #444",
    backgroundColor: "#333",
    color: "#fff",
  },
  button: {
    padding: "10px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default TransportModal;
