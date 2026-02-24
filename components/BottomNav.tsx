'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/',           label: 'ホーム', icon: '🏠' },
  { href: '/assessment', label: '診断',   icon: '📝' },
  { href: '/history',    label: '履歴',   icon: '📋' },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex z-50"
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        height: '60px', backgroundColor: '#fff',
        borderTop: '1px solid #e5e7eb', display: 'flex', zIndex: 50,
      }}
    >
      {NAV.map(({ href, label, icon }) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '2px',
              color: active ? '#7C3AED' : '#9CA3AF',
              textDecoration: 'none', fontSize: '10px',
              fontWeight: active ? 700 : 400, minHeight: '44px',
            }}
          >
            <span style={{ fontSize: '20px', lineHeight: 1 }}>{icon}</span>
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
