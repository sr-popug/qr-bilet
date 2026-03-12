"use client";
import MainPage from "./components/MainPage/MainPage";
interface TransportData {
  type: "Автобус" | "Троллейбус";
  number: string;
  vehicleId: string;
}

export default function Home() {
  return <MainPage />;
}
