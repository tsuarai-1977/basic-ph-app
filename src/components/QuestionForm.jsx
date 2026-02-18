import { useState } from 'react'
import { QUESTIONS, SCALE_LABELS, CHANNELS } from '../data/questions.js'

export default function QuestionForm({ onFinish }) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [selected, setSelected] = useState(null)

  const question = QUESTIONS[current]
  const total = QUESTIONS.length
  const progress = Math.round(((current) / total) * 100)
  const channel = CHANNELS[question.channel]
  const isLast = current === total - 1

  function handleSelect(value) {
    setSelected(value)
  }

  function handleNext() {
    if (selected === null) return
    const newAnswers = { ...answers, [question.id]: selected }
    if (isLast) {
      onFinish(newAnswers)
    } else {
      setAnswers(newAnswers)
      setSelected(answers[QUESTIONS[current + 1]?.id] ?? null)
      setCurrent((c) => c + 1)
    }
  }

  function handleBack() {
    if (current === 0) return
    const prevQ = QUESTIONS[current - 1]
    setSelected(answers[prevQ.id] ?? null)
    setCurrent((c) => c - 1)
  }

  return (
    <div className="screen question-screen">
      {/* プログレスバー */}
      <div className="progress-bar-wrap">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <div className="progress-label">
        {current + 1} / {total}
      </div>

      {/* チャンネルバッジ */}
      <div
        className="q-channel-badge"
        style={{ backgroundColor: channel.color }}
      >
        {question.channel} — {channel.ja}
      </div>

      {/* 質問文 */}
      <div className="question-card">
        <p className="question-text">{question.text}</p>
      </div>

      {/* スケール */}
      <div className="scale-container">
        <div className="scale-labels-text">
          <span>まったくそう思わない</span>
          <span>とてもそう思う</span>
        </div>
        <div className="scale-buttons">
          {SCALE_LABELS.map((item) => (
            <button
              key={item.value}
              className={`scale-btn ${selected === item.value ? 'selected' : ''}`}
              onClick={() => handleSelect(item.value)}
              title={item.label}
              style={
                selected === item.value
                  ? { borderColor: channel.color, backgroundColor: channel.color }
                  : {}
              }
            >
              {item.value}
            </button>
          ))}
        </div>
        {selected !== null && (
          <div className="selected-label">{SCALE_LABELS[selected - 1].label}</div>
        )}
      </div>

      {/* ナビゲーション */}
      <div className="nav-buttons">
        <button
          className="btn-secondary"
          onClick={handleBack}
          disabled={current === 0}
        >
          ← 戻る
        </button>
        <button
          className="btn-primary"
          onClick={handleNext}
          disabled={selected === null}
        >
          {isLast ? '結果を見る →' : '次へ →'}
        </button>
      </div>
    </div>
  )
}
