import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-full flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        {/* タイトル */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          BASIC-Ph セルフ理解ツール
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          自己理解・自己対処の可視化
        </p>

        {/* 説明 */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8 text-left space-y-4">
          <h2 className="text-lg font-semibold text-blue-900">
            このツールについて
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            BASIC-Ph（Belief・Affect・Social・Imagination・Cognition・Physiology）は、
            人がストレスや困難な状況に向き合うときに使う対処のチャンネルを6つに整理したモデルです。
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            このツールは、28の質問への回答をもとに、
            <strong>あなたが普段どのチャンネルを通じて心のバランスをとろうとしているか</strong>
            を可視化します。
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-xs text-yellow-800 leading-relaxed">
              <strong>注意：</strong>
              本ツールは自己理解のための参考ツールであり、医学的・心理学的な評価・判定を行うものではありません。
              チャンネルに優劣や正常・異常の区別はありません。
            </p>
          </div>
        </div>

        {/* チャンネル一覧 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          {[
            { label: "意味・価値", en: "Belief", color: "bg-purple-100 text-purple-800" },
            { label: "感情", en: "Affect", color: "bg-red-100 text-red-800" },
            { label: "関係", en: "Social", color: "bg-green-100 text-green-800" },
            { label: "想像", en: "Imagination", color: "bg-yellow-100 text-yellow-800" },
            { label: "思考", en: "Cognition", color: "bg-blue-100 text-blue-800" },
            { label: "身体", en: "Physiology", color: "bg-orange-100 text-orange-800" },
          ].map((ch) => (
            <div
              key={ch.en}
              className={`rounded-lg px-3 py-2 text-center ${ch.color}`}
            >
              <div className="text-xs font-medium">{ch.en}</div>
              <div className="text-sm font-bold">{ch.label}</div>
            </div>
          ))}
        </div>

        {/* 所要時間と開始ボタン */}
        <p className="text-sm text-gray-500 mb-4">
          全28問・各問0〜4で回答
        </p>
        <Link
          href="/questions"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors"
        >
          はじめる
        </Link>
      </div>
    </div>
  );
}
