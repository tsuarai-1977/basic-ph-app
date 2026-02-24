import type { Channel } from './questions'
import type { Recommendation } from './recommendations'

// ── 型定義 ──────────────────────────────────────────────────
export type { Recommendation }

export type Result = {
  id: string
  createdAt: number
  scores: Record<Channel, number>  // 各チャンネル 0-100
  top: Channel
  recommendation: Recommendation
}

// ── localStorage キー（固定） ──────────────────────────────
const HISTORY_KEY = 'basicph_history_v1'
const LAST_KEY    = 'basicph_last_result_v1'

// ── 書き込み ───────────────────────────────────────────────

/** 結果を保存する（最新 + 履歴に追加）。SSR 安全。 */
export function saveResult(result: Result): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(LAST_KEY, JSON.stringify(result))
    const history = loadHistory()
    // 同じ id があれば上書き、なければ先頭に追加
    const updated = [result, ...history.filter(r => r.id !== result.id)]
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
  } catch {
    // localStorage が使えない環境（Safari プライベートなど）では無視
  }
}

// ── 読み込み ───────────────────────────────────────────────

/** 履歴を新しい順で返す。SSR 安全。 */
export function loadHistory(): Result[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Result[]
  } catch {
    return []
  }
}

/** 最新の結果を返す。SSR 安全。 */
export function loadLastResult(): Result | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(LAST_KEY)
    if (!raw) return null
    return JSON.parse(raw) as Result
  } catch {
    return null
  }
}

/** id で結果を検索して返す。SSR 安全。 */
export function loadResultById(id: string): Result | null {
  const history = loadHistory()
  return history.find(r => r.id === id) ?? null
}
