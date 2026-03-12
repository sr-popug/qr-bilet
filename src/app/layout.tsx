import { TimeProvider } from "@/store/TimeContenxt";
import type { Metadata } from "next";
import circe from "./fonts/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Уведомление об оплате",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ru'>
      <body className={`${circe.className}`}>
        <TimeProvider>{children}</TimeProvider>
      </body>
    </html>
  );
}
