import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "BASIC-Ph セルフ理解ツール",
  description:
    "多次元対処モデル BASIC-Ph に基づく自己理解・自己対処の可視化ツールです。本ツールは診断ではありません。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="flex flex-col min-h-screen bg-white text-gray-800">
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
