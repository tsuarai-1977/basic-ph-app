import { useEffect, useRef, useState } from 'react'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'
import { CHANNELS } from '../data/questions.js'
import { getChannelComment, saveResult, loadHistory } from '../utils/scoring.js'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

export default function ResultScreen({ scores, answers, onRetake }) {
  const [saved, setSaved] = useState(false)
  const [history, setHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    const h = loadHistory()
    setHistory(h)
  }, [])

  function handleSave() {
    saveResult(answers, scores)
    setSaved(true)
    setHistory(loadHistory())
  }

  const channelKeys = Object.keys(CHANNELS)
  const dominant = channelKeys.reduce((a, b) => (scores[a] >= scores[b] ? a : b))

  // レーダーチャートデータ
  const radarData = {
    labels: channelKeys.map((k) => `${k}\n${CHANNELS[k].ja}`),
    datasets: [
      {
        label: 'あなたのスコア',
        data: channelKeys.map((k) => scores[k]),
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 0.8)',
        borderWidth: 2,
        pointBackgroundColor: channelKeys.map((k) => CHANNELS[k].color),
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: channelKeys.map((k) => CHANNELS[k].color),
        pointRadius: 5,
      },
    ],
  }

  const radarOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.raw}点`,
        },
      },
    },
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 25,
          font: { size: 11 },
          color: '#6b7280',
        },
        pointLabels: {
          font: { size: 13, weight: 'bold' },
          color: (ctx) => CHANNELS[channelKeys[ctx.index]].color,
        },
        grid: { color: 'rgba(0,0,0,0.08)' },
        angleLines: { color: 'rgba(0,0,0,0.1)' },
      },
    },
  }

  return (
    <div className="screen result-screen">
      <h2 className="result-title">あなたの BASIC-Ph プロフィール</h2>

      {/* 優位チャンネル */}
      <div
        className="dominant-card"
        style={{ borderColor: CHANNELS[dominant].color }}
      >
        <div className="dominant-label">最も強いチャンネル</div>
        <div className="dominant-channel" style={{ color: CHANNELS[dominant].color }}>
          {dominant} — {CHANNELS[dominant].ja}
        </div>
        <p className="dominant-comment">{getChannelComment(dominant, scores[dominant])}</p>
      </div>

      {/* レーダーチャート */}
      <div className="chart-container">
        <Radar data={radarData} options={radarOptions} />
      </div>

      {/* バースコア一覧 */}
      <div className="score-bars">
        {channelKeys.map((key) => (
          <div key={key} className="score-row">
            <div className="score-row-header">
              <span
                className="score-key"
                style={{ color: CHANNELS[key].color }}
              >
                {key}
              </span>
              <span className="score-name">{CHANNELS[key].ja}</span>
              <span className="score-value">{scores[key]}点</span>
            </div>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  width: `${scores[key]}%`,
                  backgroundColor: CHANNELS[key].color,
                }}
              />
            </div>
            <p className="score-comment">{getChannelComment(key, scores[key])}</p>
          </div>
        ))}
      </div>

      {/* 保存 */}
      <div className="action-buttons">
        {!saved ? (
          <button className="btn-primary" onClick={handleSave}>
            💾 結果を保存する
          </button>
        ) : (
          <div className="saved-message">✅ 保存しました</div>
        )}
        <button className="btn-secondary" onClick={onRetake}>
          もう一度診断する
        </button>
      </div>

      {/* 過去履歴 */}
      {history.length > 0 && (
        <div className="history-section">
          <button
            className="btn-ghost"
            onClick={() => setShowHistory((v) => !v)}
          >
            {showHistory ? '▲ 履歴を閉じる' : `▼ 過去の履歴 (${history.length}件)`}
          </button>
          {showHistory && (
            <div className="history-list">
              {history.map((entry) => (
                <div key={entry.id} className="history-entry">
                  <div className="history-date">{entry.date}</div>
                  <div className="history-scores">
                    {Object.keys(CHANNELS).map((k) => (
                      <span key={k} className="history-score-chip" style={{ borderColor: CHANNELS[k].color }}>
                        <span style={{ color: CHANNELS[k].color }}>{k}</span> {entry.scores[k]}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <p className="disclaimer">
        ※ このツールは自己理解を目的としたものです。臨床的な診断・評価の代替ではありません。
      </p>
    </div>
  )
}
