'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { loadResultById, loadLastResult, type Result } from '@/lib/storage'
import ChannelBadge from '@/components/ChannelBadge'
import { CHANNEL_ORDER, type Channel } from '@/lib/questions'

const NAMES: Record<Channel, string> = {
  B: '信念', A: '感情', S: '社会', I: '想像', C: '認知', Ph: '身体',
}

const DESCS: Record<Channel, string> = {
  B:  '意味を見いだす、覚悟を決める、精神的な支えを持つ',
  A:  '喜怒哀楽を感じる・表現する、歌う、楽器を演奏する',
  S:  '人とつながる、助けを求める、支え合う、所属する',
  I:  '芸術・映画・ゲームで別の視点を持つ、空想・物語で捉える',
  C:  '現実的に分析する、問題を解決する、計画を立てる',
  Ph: '食べる、休む、身体を動かす、瞑想する',
}

const COLORS: Record<Channel, { bg: string; bar: string }> = {
  B:  { bg: '#EDE9FE', bar: '#7C3AED' },
  A:  { bg: '#FFF7ED', bar: '#EA580C' },
  S:  { bg: '#E0F2FE', bar: '#0284C7' },
  I:  { bg: '#FCE7F3', bar: '#DB2777' },
  C:  { bg: '#FEF9C3', bar: '#CA8A04' },
  Ph: { bg: '#FEE2E2', bar: '#DC2626' },
}

export default function ResultClient() {
  const searchParams = useSearchParams()
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = searchParams.get('id')
    let found: Result | null = null
    if (id) found = loadResultById(id)
    if (!found) found = loadLastResult()
    setResult(found)
    setLoading(false)
  }, [searchParams])

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
        <p style={{ color: '#9ca3af', fontSize: '14px' }}>読み込み中...</p>
      </div>
    )
  }

  if (!result) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', padding: '24px' }}>
        <p style={{ color: '#6b7280', fontSize: '15px', marginBottom: '24px' }}>
          診断結果が見つかりません
        </p>
        <Link
          href="/assessment"
          style={{ backgroundColor: '#7C3AED', color: '#fff', padding: '14px 28px', borderRadius: '14px', textDecoration: 'none', fontWeight: 700, fontSize: '15px' }}
        >
          診断をはじめる
        </Link>
      </div>
    )
  }

  const { scores, top, recommendation } = result
  const tc = COLORS[top]
  const sorted = [...CHANNEL_ORDER].sort((a, b) => scores[b] - scores[a])

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', padding: '24px 16px' }}>

      {/* いま選ばれたチャンネル */}
      <div
        style={{
          backgroundColor: tc.bg,
          borderRadius: '20px',
          padding: '20px',
          marginBottom: '24px',
          border: `2px solid ${tc.bar}`,
        }}
      >
        <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>
          いま選ばれたチャンネル
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <ChannelBadge channel={top} size="lg" />
          <span style={{ fontSize: '26px', fontWeight: 700, color: tc.bar }}>
            {scores[top]}
          </span>
          <span style={{ fontSize: '13px', color: '#6b7280' }}>/ 100</span>
        </div>
        <p style={{ fontSize: '13px', color: '#374151', lineHeight: 1.7, marginBottom: '16px' }}>
          {DESCS[top]}
        </p>

        {/* まず、ひとつすすめてみる */}
        <div style={{ backgroundColor: '#fff', borderRadius: '14px', padding: '16px' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, color: tc.bar, marginBottom: '8px' }}>
            💡 まず、ひとつすすめてみる
          </p>
          <p style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', marginBottom: '8px' }}>
            {recommendation.title}
          </p>
          <p style={{ fontSize: '13px', color: '#374151', lineHeight: 1.7 }}>
            {recommendation.steps[0]}
          </p>
        </div>
      </div>

      {/* 6チャンネルスコア一覧 */}
      <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1f2937', marginBottom: '12px' }}>
        6チャンネルのスコア
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
        {sorted.map(ch => {
          const c = COLORS[ch]
          return (
            <div
              key={ch}
              style={{
                backgroundColor: '#fff',
                borderRadius: '14px',
                padding: '14px 16px',
                border: ch === top ? `2px solid ${c.bar}` : '1px solid #f3f4f6',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <ChannelBadge channel={ch} size="sm" />
                <span style={{ fontSize: '15px', fontWeight: 700, color: c.bar }}>
                  {scores[ch]}
                </span>
              </div>
              <div style={{ height: '6px', backgroundColor: '#f3f4f6', borderRadius: '9999px' }}>
                <div
                  style={{
                    height: '6px',
                    backgroundColor: c.bar,
                    borderRadius: '9999px',
                    width: `${scores[ch]}%`,
                  }}
                />
              </div>
              <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '4px' }}>
                {NAMES[ch]}：{DESCS[ch]}
              </p>
            </div>
          )
        })}
      </div>

      {/* アクションボタン */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
        <Link
          href="/recommendations"
          style={{
            display: 'block', backgroundColor: '#7C3AED', color: '#fff',
            padding: '16px', borderRadius: '16px', textDecoration: 'none',
            textAlign: 'center', fontWeight: 700, fontSize: '15px',
          }}
        >
          まず、ひとつすすめてみる
        </Link>
        <Link
          href="/assessment"
          style={{
            display: 'block', backgroundColor: '#fff', color: '#7C3AED',
            padding: '16px', borderRadius: '16px', textDecoration: 'none',
            textAlign: 'center', fontWeight: 600, fontSize: '14px',
            border: '2px solid #C4B5FD',
          }}
        >
          もう一度やってみる
        </Link>
      </div>

      <p style={{ textAlign: 'center', fontSize: '11px', color: '#d1d5db' }}>
        {new Date(result.createdAt).toLocaleString('ja-JP')}
      </p>
      <div style={{ height: '16px' }} />
    </div>
  )
}
