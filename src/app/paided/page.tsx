"use client";
import AuthGuard from "@/components/AuthGuard/AuthGuard";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { Suspense } from "react";
import MainPage from "../../components/MainPage/MainPage";

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
        <Header text={"Уведомление об оплате"} />
        <MainPage />
        <Footer />
      </AuthGuard>
    </Suspense>
  );
}
