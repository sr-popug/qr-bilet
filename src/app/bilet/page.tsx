"use client";
import AuthGuard from "@/components/AuthGuard/AuthGuard";
import BiletPage from "@/components/BiletPage/BiletPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div style={{ color: "white", padding: "50px", textAlign: "center" }}>
          Загрузка...
        </div>
      }
    >
      <AuthGuard>
        <BiletPage />
      </AuthGuard>
    </Suspense>
  );
}
