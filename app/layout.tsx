import type { Metadata, Viewport } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import AppHeader from "@/components/AppHeader";

export const metadata: Metadata = {
  title: "あなたの元気を少し取り戻すためのアプリ",
  description:
    "BASIC-Ph 多次元対処モデルに基づく自己理解・自己対処の可視化ツールです。医学的な評価ではありません。",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "あなたの元気を少し取り戻すためのアプリ",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#C4B5FD",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
        <AppHeader />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
