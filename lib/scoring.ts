import { Channel, CHANNEL_ORDER, QUESTIONS, PRIMARY_WEIGHT, SECONDARY_WEIGHT } from './questions'

// questionId -> 0|1|2|3
export type Answers = Record<number, number>

/**
 * 回答から各チャンネルスコア（0-100）を計算する。
 * primary チャンネルに PRIMARY_WEIGHT(3) 点、secondary に SECONDARY_WEIGHT(1) 点を配点し、
 * チャンネルごとに最大値で割って 0-100 に正規化する。
 */
export function computeScores(answers: Answers): Record<Channel, number> {
  const raw: Record<Channel, number> = { B: 0, A: 0, S: 0, I: 0, C: 0, Ph: 0 }
  const max: Record<Channel, number> = { B: 0, A: 0, S: 0, I: 0, C: 0, Ph: 0 }

  for (const q of QUESTIONS) {
    const ans = answers[q.id] ?? 0
    raw[q.primary]   += ans * PRIMARY_WEIGHT
    raw[q.secondary] += ans * SECONDARY_WEIGHT
    max[q.primary]   += 3 * PRIMARY_WEIGHT
    max[q.secondary] += 3 * SECONDARY_WEIGHT
  }

  const scores = {} as Record<Channel, number>
  for (const ch of CHANNEL_ORDER) {
    scores[ch] = max[ch] > 0 ? Math.round((raw[ch] / max[ch]) * 100) : 0
  }
  return scores
}

/**
 * 最高スコアのチャンネルを返す。
 * 同点の場合は B > A > S > I > C > Ph の順で決定（固定）。
 */
export function pickTop(scores: Record<Channel, number>): Channel {
  return CHANNEL_ORDER.reduce(
    (best, ch) => (scores[ch] > scores[best] ? ch : best),
    CHANNEL_ORDER[0]
  )
}
