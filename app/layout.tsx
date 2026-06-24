import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MonPay",
  description: "Управление оплатами цифровой инфраструктуры",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
