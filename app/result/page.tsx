import { Suspense } from 'react'
import ResultClient from './ResultClient'

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
          <p style={{ color: '#9ca3af', fontSize: '14px' }}>読み込み中...</p>
        </div>
      }
    >
      <ResultClient />
    </Suspense>
  )
}
