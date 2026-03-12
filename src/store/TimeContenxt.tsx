"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// 1. Переносим интерфейс сюда, чтобы он был доступен везде
export interface TransportData {
  type: "Автобус" | "Троллейбус";
  number: string;
  vehicleId: string;
}

interface TimeContextType {
  paymentTimestamp: number | null;
  setPaymentTimestamp: React.Dispatch<React.SetStateAction<number | null>>;
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  // 2. Добавляем данные о транспорте в тип контекста
  formData: TransportData;
  setFormData: React.Dispatch<React.SetStateAction<TransportData>>;
}

const TimeContext = createContext<TimeContextType | undefined>(undefined);

export function TimeProvider({ children }: { children: ReactNode }) {
  const [paymentTimestamp, setPaymentTimestamp] = useState<number | null>(null);
  const [seconds, setSeconds] = useState(0);

  // 3. Создаем глобальный стейт для формы
  const [formData, setFormData] = useState<TransportData>({
    type: "Автобус",
    number: "",
    vehicleId: "",
  });

  useEffect(() => {
    const initTimer = setTimeout(() => {
      setPaymentTimestamp(prev => prev ?? Date.now());
    }, 0);

    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => {
      clearTimeout(initTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <TimeContext.Provider
      // 4. Прокидываем formData и setFormData
      value={{
        paymentTimestamp,
        setPaymentTimestamp,
        seconds,
        setSeconds,
        formData,
        setFormData,
      }}
    >
      {children}
    </TimeContext.Provider>
  );
}

export function useTimeStore() {
  const context = useContext(TimeContext);
  if (!context) {
    throw new Error("useTimeStore должен использоваться внутри TimeProvider");
  }
  return context;
}
