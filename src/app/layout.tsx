import type { Metadata } from "next";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
