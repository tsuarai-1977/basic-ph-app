import Link from 'next/link'

export default function StartPage() {
  return (
    <div
      className="max-w-xl mx-auto px-4 py-10 flex flex-col items-center text-center"
      style={{ maxWidth: '480px', margin: '0 auto', padding: '40px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', minHeight: '60vh', justifyContent: 'center' }}
    >
      {/* タイトル */}
      <h2
        className="text-2xl font-bold text-gray-800 mb-2 leading-tight"
        style={{ fontSize: '22px', fontWeight: 700, color: '#1f2937', marginBottom: '8px', lineHeight: 1.4 }}
      >
        あなたの元気を<br />少し取り戻すためのアプリ
      </h2>
      <p
        className="text-sm mb-8"
        style={{ fontSize: '13px', color: '#7C3AED', marginBottom: '32px' }}
      >
        BASIC-Ph 多次元対処モデル
      </p>

      {/* 説明カード */}
      <div
        className="bg-white rounded-2xl px-5 py-5 shadow-sm border border-gray-100 mb-8 text-left w-full"
        style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '32px', textAlign: 'left', border: '1px solid #f3f4f6', width: '100%' }}
      >
        <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.8, marginBottom: '8px' }}>
          困難な状況でも、あなたにはすでに対処の力があります。
        </p>
        <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.8, marginBottom: '8px' }}>
          12の質問に答えるだけで、自分が自然に使っている対処のチャンネルがわかります。
        </p>
        <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.8 }}>
          所要時間：約3分。匿名で開始できます。
        </p>
      </div>

      {/* CTA */}
      <Link
        href="/assessment"
        className="block w-full bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white font-bold text-lg py-4 rounded-2xl shadow-md transition-colors mb-4"
        style={{ display: 'block', width: '100%', backgroundColor: '#7C3AED', color: '#fff', fontWeight: 700, fontSize: '17px', padding: '16px', borderRadius: '16px', textDecoration: 'none', textAlign: 'center', marginBottom: '16px' }}
      >
        診断をはじめる
      </Link>

      <Link
        href="/history"
        className="text-sm text-gray-400 hover:text-gray-600"
        style={{ fontSize: '13px', color: '#9ca3af', textDecoration: 'none' }}
      >
        過去の記録を見る
      </Link>

      {/* ログイン導線（近日対応・ダミー） */}
      <button
        disabled
        className="mt-8 text-xs text-gray-300 cursor-not-allowed"
        style={{ marginTop: '32px', fontSize: '12px', color: '#d1d5db', background: 'none', border: 'none', cursor: 'not-allowed' }}
      >
        🔒 ログインして引き継ぐ（近日対応）
      </button>
    </div>
  )
}
