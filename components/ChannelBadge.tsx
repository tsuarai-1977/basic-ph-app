'use client'
import type { Channel } from '@/lib/questions'

type Info = { label: string; color: string; bg: string }

const INFO: Record<Channel, Info> = {
  B:  { label: 'B 信念',  color: '#7C3AED', bg: '#EDE9FE' },
  A:  { label: 'A 感情',  color: '#EA580C', bg: '#FFF7ED' },
  S:  { label: 'S 社会',  color: '#0284C7', bg: '#E0F2FE' },
  I:  { label: 'I 想像',  color: '#DB2777', bg: '#FCE7F3' },
  C:  { label: 'C 認知',  color: '#CA8A04', bg: '#FEF9C3' },
  Ph: { label: 'Ph 身体', color: '#DC2626', bg: '#FEE2E2' },
}

type Props = {
  channel: Channel
  size?: 'sm' | 'md' | 'lg'
}

export default function ChannelBadge({ channel, size = 'md' }: Props) {
  const { label, color, bg } = INFO[channel]
  const fontSize  = size === 'sm' ? '11px' : size === 'lg' ? '16px' : '13px'
  const padding   = size === 'sm' ? '2px 8px' : size === 'lg' ? '6px 14px' : '4px 10px'

  return (
    <span
      className={
        size === 'sm'
          ? 'inline-block text-xs font-semibold rounded-full'
          : size === 'lg'
          ? 'inline-block text-base font-bold rounded-full'
          : 'inline-block text-sm font-semibold rounded-full'
      }
      style={{ backgroundColor: bg, color, fontSize, padding, lineHeight: 1.5 }}
    >
      {label}
    </span>
  )
}
