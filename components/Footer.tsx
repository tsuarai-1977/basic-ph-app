/**
 * フッターコンポーネント
 * CONSTITUTION.md 第4条に基づく免責文を全ページに表示する（改変禁止）
 */
export default function Footer() {
  return (
    <footer className="mt-auto py-6 px-4 border-t border-gray-200 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs text-gray-500 leading-relaxed text-center">
          本ツールはBASIC-Phに基づく自己理解・自己対処の可視化を目的としており、医学的・心理学的な診断を行うものではありません。結果は「あなたの対処のあり方の傾向」を示す参考情報であり、優劣・正常異常の判定を含みません。心身の不調や専門的なサポートが必要と感じる場合は、医療機関や専門家にご相談ください。
        </p>
      </div>
    </footer>
  );
}
