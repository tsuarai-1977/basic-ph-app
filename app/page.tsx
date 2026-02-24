import Link from "next/link";

export default function StartPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-10 flex flex-col items-center text-center min-h-[60vh] justify-center">
      {/* キャッチコピー */}
      <p className="text-base text-gray-600 leading-relaxed mb-2">
        困難な状況でも、あなたにはすでに対処があります。
      </p>
      <p className="text-sm text-gray-400 mb-10">
        まず2問だけ答えてみましょう。
      </p>

      {/* 開始ボタン */}
      <Link
        href="/assessment"
        className="block w-full max-w-xs bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white font-bold text-lg py-4 rounded-2xl shadow-md transition-colors"
      >
        匿名で開始
      </Link>

      {/* 履歴リンク */}
      <Link
        href="/history"
        className="mt-6 text-sm text-gray-400 hover:text-gray-600 underline-offset-2 hover:underline"
      >
        過去の記録を見る
      </Link>
    </div>
  );
}
