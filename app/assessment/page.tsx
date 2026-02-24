'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { QUESTIONS } from '@/lib/questions'
import { computeScores, pickTop, type Answers } from '@/lib/scoring'
import { getRecommendation } from '@/lib/recommendations'
import { saveResult, type Result } from '@/lib/storage'

const LABELS = ['まったく', '少し', 'わりと', 'とても'] as const

function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export default function AssessmentPage() {
  const router = useRouter()
  const [answers, setAnswers] = useState<Answers>({})
  const [showError, setShowError] = useState(false)

  const answeredCount = Object.keys(answers).length
  const unanswered = QUESTIONS.filter(q => answers[q.id] === undefined)
  const isComplete = unanswered.length === 0

  function handleAnswer(questionId: number, value: number) {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  function handleSubmit() {
    if (!isComplete) {
      setShowError(true)
      const firstId = unanswered[0].id
      document.getElementById(`q-${firstId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    const scores = computeScores(answers)
    const top = pickTop(scores)
    const recommendation = getRecommendation(top)
    const id = generateId()

    const result: Result = { id, createdAt: Date.now(), scores, top, recommendation }
    saveResult(result)
    router.push(`/result?id=${id}`)
  }

  return (
    <div
      className="max-w-xl mx-auto px-4 py-6"
      style={{ maxWidth: '480px', margin: '0 auto', padding: '24px 16px' }}
    >
      <h2
        className="text-lg font-bold text-gray-800 mb-1"
        style={{ fontSize: '18px', fontWeight: 700, color: '#1f2937', marginBottom: '4px' }}
      >
        12の質問
      </h2>
      <p
        className="text-sm text-gray-400 mb-6"
        style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '24px' }}
      >
        困難なとき、自分がどの程度あてはまるかを選んでください
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {QUESTIONS.map((q, idx) => {
          const ans = answers[q.id]
          const isUnanswered = showError && ans === undefined
          return (
            <div
              key={q.id}
              id={`q-${q.id}`}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm"
              style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '16px',
                border: isUnanswered ? '2px solid #EF4444' : '1px solid #f3f4f6',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
              }}
            >
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '12px', lineHeight: 1.6 }}>
                <span style={{ color: '#9ca3af', marginRight: '6px' }}>{idx + 1}.</span>
                {q.text}
              </p>

              {/* 0-3 選択ボタン */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                {LABELS.map((label, value) => (
                  <button
                    key={value}
                    onClick={() => handleAnswer(q.id, value)}
                    style={{
                      padding: '10px 4px',
                      borderRadius: '10px',
                      border: ans === value ? '2px solid #7C3AED' : '1px solid #e5e7eb',
                      backgroundColor: ans === value ? '#EDE9FE' : '#f9fafb',
                      color: ans === value ? '#5B21B6' : '#6b7280',
                      fontSize: '11px',
                      fontWeight: ans === value ? 700 : 400,
                      cursor: 'pointer',
                      minHeight: '52px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '2px',
                    }}
                  >
                    <span style={{ fontSize: '18px', fontWeight: 700 }}>{value}</span>
                    {label}
                  </button>
                ))}
              </div>

              {isUnanswered && (
                <p style={{ fontSize: '12px', color: '#EF4444', marginTop: '6px' }}>
                  回答を選んでください
                </p>
              )}
            </div>
          )
        })}
      </div>

      {/* 進捗バー */}
      <div style={{ marginTop: '24px', marginBottom: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ fontSize: '12px', color: '#9ca3af' }}>回答済み</span>
          <span style={{ fontSize: '12px', color: '#9ca3af' }}>
            {answeredCount} / {QUESTIONS.length}
          </span>
        </div>
        <div style={{ height: '4px', backgroundColor: '#e5e7eb', borderRadius: '9999px' }}>
          <div
            style={{
              height: '4px',
              backgroundColor: '#7C3AED',
              borderRadius: '9999px',
              width: `${(answeredCount / QUESTIONS.length) * 100}%`,
              transition: 'width 0.3s',
            }}
          />
        </div>
      </div>

      {showError && !isComplete && (
        <p style={{ fontSize: '13px', color: '#EF4444', textAlign: 'center', marginBottom: '8px' }}>
          未回答の質問があります（残り {unanswered.length} 問）
        </p>
      )}

      <button
        onClick={handleSubmit}
        className={isComplete ? 'bg-violet-500 hover:bg-violet-600' : 'bg-gray-200'}
        style={{
          width: '100%',
          padding: '16px',
          borderRadius: '16px',
          backgroundColor: isComplete ? '#7C3AED' : '#e5e7eb',
          color: isComplete ? '#fff' : '#9ca3af',
          fontWeight: 700,
          fontSize: '16px',
          border: 'none',
          cursor: isComplete ? 'pointer' : 'not-allowed',
          marginTop: '8px',
          minHeight: '56px',
        }}
      >
        結果を見る
      </button>

      <div style={{ height: '24px' }} />
    </div>
  )
}
