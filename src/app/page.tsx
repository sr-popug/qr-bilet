"use client";
import AuthGuard from "@/components/AuthGuard/AuthGuard";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { Suspense } from "react";
import MainPage from "../components/MainPage/MainPage";
interface TransportData {
  type: "Автобус" | "Троллейбус";
  number: string;
  vehicleId: string;
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div style={{ color: "white", padding: "50px", textAlign: "center" }}>
          Загрузка...
        </div>
      }
    >
      <AuthGuard>
        <Header />
        <MainPage />
        <Footer />
      </AuthGuard>
    </Suspense>
  );
}
