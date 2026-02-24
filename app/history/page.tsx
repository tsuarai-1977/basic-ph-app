'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { loadHistory, type Result } from '@/lib/storage'
import ChannelBadge from '@/components/ChannelBadge'
import { CHANNEL_ORDER, type Channel } from '@/lib/questions'

const BAR_COLORS: Record<Channel, string> = {
  B: '#7C3AED', A: '#EA580C', S: '#0284C7',
  I: '#DB2777', C: '#CA8A04', Ph: '#DC2626',
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleString('ja-JP', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function HistoryPage() {
  const [history, setHistory] = useState<Result[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setHistory(loadHistory())
    setLoaded(true)
  }, [])

  if (!loaded) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
        <p style={{ color: '#9ca3af', fontSize: '14px' }}>読み込み中...</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', padding: '24px 16px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1f2937', marginBottom: '16px' }}>
        過去の記録
      </h2>

      {history.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 0', color: '#9ca3af' }}>
          <p style={{ fontSize: '14px', marginBottom: '24px' }}>まだ記録がありません。</p>
          <Link
            href="/assessment"
            style={{
              display: 'inline-block', backgroundColor: '#7C3AED', color: '#fff',
              padding: '12px 24px', borderRadius: '14px', textDecoration: 'none',
              fontWeight: 700, fontSize: '14px',
            }}
          >
            はじめてみる
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {history.map(r => (
            <Link
              key={r.id}
              href={`/result?id=${r.id}`}
              style={{
                display: 'block', backgroundColor: '#fff',
                borderRadius: '16px', padding: '16px',
                border: '1px solid #f3f4f6',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                textDecoration: 'none', color: 'inherit',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <p style={{ fontSize: '12px', color: '#9ca3af' }}>{formatDate(r.createdAt)}</p>
                <ChannelBadge channel={r.top} size="sm" />
              </div>

              {/* ミニスコアバー */}
              <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '32px' }}>
                {CHANNEL_ORDER.map(ch => (
                  <div
                    key={ch}
                    title={`${ch}: ${r.scores[ch]}`}
                    style={{
                      flex: 1,
                      backgroundColor: BAR_COLORS[ch],
                      opacity: ch === r.top ? 1 : 0.3,
                      borderRadius: '3px',
                      height: `${Math.max(4, r.scores[ch] * 0.3)}px`,
                      alignSelf: 'flex-end',
                    }}
                  />
                ))}
              </div>
              <div style={{ display: 'flex', gap: '4px', marginTop: '2px' }}>
                {CHANNEL_ORDER.map(ch => (
                  <span key={ch} style={{ flex: 1, fontSize: '9px', color: '#9ca3af', textAlign: 'center' }}>
                    {ch}
                  </span>
                ))}
              </div>

              <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '8px' }}>
                タップして詳細を見る →
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
