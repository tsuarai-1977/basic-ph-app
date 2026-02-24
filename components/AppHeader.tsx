import Link from "next/link";

export default function AppHeader() {
  return (
    <header className="w-full bg-white border-b border-gray-100 px-4 py-4">
      <div className="max-w-xl mx-auto flex items-center justify-between">
        <Link href="/" className="block">
          <h1 className="text-lg font-bold text-gray-800 leading-tight">
            あなたの元気を少し取り戻すためのアプリ
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">BASIC-Ph 多次元対処モデル</p>
        </Link>
        <Link
          href="/history"
          className="text-xs text-gray-500 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 whitespace-nowrap"
        >
          履歴
        </Link>
      </div>
    </header>
  );
}
