'use client';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface TransportData {
  type: 'Автобус' | 'Троллейбус';
  number: string;
  vehicleId: string;
}

interface TimeContextType {
  paymentTimestamp: number | null;
  setPaymentTimestamp: React.Dispatch<React.SetStateAction<number | null>>;
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  formData: TransportData;
  setFormData: React.Dispatch<React.SetStateAction<TransportData>>;
}

const TimeContext = createContext<TimeContextType | undefined>(undefined);

export function TimeProvider({ children }: { children: ReactNode }) {
  const [paymentTimestamp, setPaymentTimestamp] = useState<number | null>(null);
  const [seconds, setSeconds] = useState(0);

  const [formData, setFormData] = useState<TransportData>({
    type: 'Автобус',
    number: '',
    vehicleId: '',
  });
  useEffect(() => {
    const storedFormData = sessionStorage.getItem('formData');
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  useEffect(() => {
    if (!paymentTimestamp) {
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const diffInSeconds = Math.floor((now - paymentTimestamp) / 1000);
      setSeconds(diffInSeconds);
    }, 1000);

    return () => clearInterval(interval);
  }, [paymentTimestamp]);

  return (
    <TimeContext.Provider
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
    throw new Error('useTimeStore должен использоваться внутри TimeProvider');
  }
  return context;
}
