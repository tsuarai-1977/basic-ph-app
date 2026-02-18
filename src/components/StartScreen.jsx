import { CHANNELS } from '../data/questions.js'
import { loadHistory } from '../utils/scoring.js'

export default function StartScreen({ onStart }) {
  const history = loadHistory()
  const hasHistory = history.length > 0

  return (
    <div className="screen start-screen">
      <header className="start-header">
        <div className="logo">BASIC-Ph</div>
        <h1 className="start-title">セルフ理解ツール</h1>
        <p className="start-subtitle">
          あなたの「コーピングチャンネル」を知ろう
        </p>
      </header>

      <section className="channel-intro">
        <p className="intro-text">
          BASIC-Ph とは、人が困難に対処するときに使う<strong>6つのチャンネル</strong>を示す心理学モデルです。
          どのチャンネルをよく使うかを知ることで、自分の強みと、伸ばせる部分が見えてきます。
        </p>
        <ul className="channel-list">
          {Object.entries(CHANNELS).map(([key, ch]) => (
            <li key={key} className="channel-item">
              <span
                className="channel-badge"
                style={{ backgroundColor: ch.color }}
              >
                {key}
              </span>
              <span className="channel-name">{ch.ja}</span>
              <span className="channel-desc">{ch.desc}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="start-info">
        <div className="info-card">
          <span className="info-icon">📝</span>
          <div>
            <strong>18問</strong>
            <span>（各チャンネル3問）</span>
          </div>
        </div>
        <div className="info-card">
          <span className="info-icon">⏱️</span>
          <div>
            <strong>約3〜5分</strong>
            <span>直感で答えてOK</span>
          </div>
        </div>
        <div className="info-card">
          <span className="info-icon">💾</span>
          <div>
            <strong>ブラウザ保存</strong>
            <span>履歴10件まで保存</span>
          </div>
        </div>
      </section>

      {hasHistory && (
        <div className="history-notice">
          過去の診断結果が{history.length}件あります（結果画面で確認できます）
        </div>
      )}

      <button className="btn-primary btn-large" onClick={onStart}>
        診断をはじめる
      </button>

      <p className="disclaimer">
        ※ このツールは自己理解を目的としたものです。臨床的な診断・評価の代替ではありません。
      </p>
    </div>
  )
}
