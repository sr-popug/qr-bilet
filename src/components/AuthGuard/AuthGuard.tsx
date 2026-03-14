"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SBPLoader from "../SBPLoader/SBPLoader";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      // 1. Ищем токен в ссылке (если человек только что перешел из бота)
      const tokenFromUrl = searchParams.get("token");

      // 2. Ищем токен в памяти браузера (если он уже заходил ранее)
      const tokenFromStorage = localStorage.getItem("app_access_token");

      const currentToken = tokenFromUrl || tokenFromStorage;

      if (!currentToken) {
        setIsLoading(false);
        return; // Токена нет вообще, доступ закрыт
      }

      let isValidToken = false;

      let deviceId = localStorage.getItem("local_device_id");

      if (!deviceId) {
        deviceId =
          Math.random().toString(36).substring(2) + Date.now().toString(36);

        localStorage.setItem("local_device_id", deviceId);
      }
      try {
        const response = await fetch("/api/check-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: currentToken, deviceId: deviceId }),
        });

        const data = await response.json();
        isValidToken = data.isValid;
      } catch (error) {
        console.error("Ошибка при проверке токена", error);
        isValidToken = false; // Если сервер упал, доступ не даем
      }

      if (isValidToken) {
        localStorage.setItem("app_access_token", currentToken);
        setIsAuthorized(true);

        if (tokenFromUrl) {
          router.replace("/");
        }
      } else {
        localStorage.removeItem("app_access_token");
      }

      setIsLoading(false);
    };

    checkAccess();
  }, [searchParams, router]);

  // Пока идет проверка, показываем крутилку
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
          background: "#ffffff",
        }}
      >
        <SBPLoader />
      </div>
    );
  }

  // Если проверки не пройдена, показываем экран покупки
  if (!isAuthorized) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#1c1c1c",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <h2>Доступ закрыт 🔒</h2>
        <p style={{ color: "#999", marginTop: "10px", textAlign: "center" }}>
          Для использования сервиса необходимо иметь доступ.
        </p>
        {/* <a
          href='https://t.me/@sitego_42'
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            background: "#0088cc",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          Купить доступ
        </a> */}
      </div>
    );
  }

  // Если всё ок — показываем сам сайт (билет)
  return <>{children}</>;
}
