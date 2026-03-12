"use client";
import AdminPage from "@/components/Admin/Admin";
import AuthGuard from "@/components/AuthGuard/AuthGuard";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense
      fallback={
        <div style={{ color: "white", padding: "50px", textAlign: "center" }}>
          Загрузка...
        </div>
      }
    >
      <AuthGuard>
        <AdminPage />
      </AuthGuard>
    </Suspense>
  );
}
