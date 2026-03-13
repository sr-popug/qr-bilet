"use client";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./admin.module.css";

interface Token {
  id: number;
  token: string;
  is_active: boolean;
  device_id: string | null;
}
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [tokens, setTokens] = useState<Token[]>([]);

  const fetchTokens = async () => {
    const { data } = await supabase
      .from("access_tokens")
      .select("*")
      .order("id", { ascending: false });
    console.log(data);
    if (data) setTokens(data);
  };
  useEffect(() => {
    const checkAuthStatus = async () => {
      const savedPassword = localStorage.getItem("a-password");

      if (savedPassword === process.env.NEXT_PUBLIC_ADMIN_PASSWORD!) {
        setIsAuthenticated(true);
        await fetchTokens();
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogin = () => {
    if (
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD! ||
      localStorage.getItem("a-password") ===
        process.env.NEXT_PUBLIC_ADMIN_PASSWORD!
    ) {
      setIsAuthenticated(true);
      fetchTokens();
      localStorage.setItem(
        "a-password",
        process.env.NEXT_PUBLIC_ADMIN_PASSWORD,
      );
    } else alert("Неверный пароль!");
  };

  const handleCreateToken = async () => {
    let newToken;
    const uniq = tokens.find(i => i.token == token);
    console.log(token, uniq);
    if (!token || uniq) {
      newToken =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
    } else {
      newToken = token;
    }
    await supabase
      .from("access_tokens")
      .insert([{ token: newToken, is_active: true }]);
    fetchTokens();
    navigator.clipboard.writeText(
      `https://qr-bilet.vercel.app/?token=${newToken}`,
    );
  };

  const handleUnbind = async (id: number) => {
    await supabase
      .from("access_tokens")
      .update({ device_id: null })
      .eq("id", id);
    fetchTokens();
  };

  const handleDelete = async (id: number) => {
    await supabase.from("access_tokens").delete().eq("id", id);
    fetchTokens();
  };
  if (!isAuthenticated) {
    return (
      <div className={styles.loginWrapper}>
        <div className={styles.loginForm}>
          <h2>Вход в админку</h2>
          <input
            type='password'
            placeholder='Пароль'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Войти</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <div className={styles.header}>
        <input
          value={token}
          onChange={e => setToken(e.target.value)}
          type='text'
          placeholder='Токен'
        />
        <button className={styles.btnCreate} onClick={handleCreateToken}>
          +
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Токен</th>
              <th>ID Устройства</th>

              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map(t => (
              <tr key={t.id}>
                <td>{t.token}</td>
                <td>{t.device_id || "Не привязан"}</td>

                <td>
                  <div className={styles.buttons}>
                    <div className={styles.buttons2}>
                      <button
                        className={styles.btnUnbind}
                        onClick={() => handleUnbind(t.id)}
                        disabled={!t.device_id}
                      >
                        Отвязать
                      </button>
                      <button
                        className={styles.btnCopyLink}
                        onClick={() =>
                          navigator.clipboard.writeText(
                            `https://qr-bilet.vercel.app/?token=${t.token}`,
                          )
                        }
                      >
                        <Image
                          src={"/link.svg"}
                          width={20}
                          height={20}
                          alt={"link"}
                        />
                      </button>
                    </div>
                    <button
                      className={styles.btnDelete}
                      onClick={() => handleDelete(t.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
