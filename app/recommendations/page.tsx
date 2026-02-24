import Link from 'next/link'
import ChannelBadge from '@/components/ChannelBadge'
import { RECOMMENDATIONS } from '@/lib/recommendations'
import { CHANNEL_ORDER, type Channel } from '@/lib/questions'

const COLORS: Record<Channel, string> = {
  B: '#7C3AED', A: '#EA580C', S: '#0284C7',
  I: '#DB2777', C: '#CA8A04', Ph: '#DC2626',
}

export default function RecommendationsPage() {
  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', padding: '24px 16px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1f2937', marginBottom: '4px' }}>
        6チャンネルの提案
      </h2>
      <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '24px' }}>
        まず、ひとつすすめてみる
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {CHANNEL_ORDER.map(ch => {
          const rec = RECOMMENDATIONS[ch]
          const bar = COLORS[ch]
          return (
            <div
              key={ch}
              style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid #f3f4f6',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ height: '4px', backgroundColor: bar }} />
              <div style={{ padding: '16px' }}>
                <div style={{ marginBottom: '10px' }}>
                  <ChannelBadge channel={ch} size="sm" />
                </div>
                <p style={{ fontSize: '15px', fontWeight: 700, color: '#1f2937', marginBottom: '12px' }}>
                  {rec.title}
                </p>
                <ol style={{ paddingLeft: '18px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {rec.steps.map((step, i) => (
                    <li key={i} style={{ fontSize: '13px', color: '#374151', lineHeight: 1.7 }}>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ height: '16px' }} />
      <Link
        href="/assessment"
        style={{
          display: 'block', backgroundColor: '#7C3AED', color: '#fff',
          padding: '16px', borderRadius: '16px', textDecoration: 'none',
          textAlign: 'center', fontWeight: 700, fontSize: '15px', marginTop: '8px',
        }}
      >
        もう一度やってみる
      </Link>
      <div style={{ height: '24px' }} />
    </div>
  )
}
