import { QUESTIONS, CHANNELS } from '../data/questions.js'

/**
 * answers: { [questionId]: 1-5 }
 * returns: { B: 0-100, A: 0-100, S: 0-100, I: 0-100, C: 0-100, Ph: 0-100 }
 */
export function calcScores(answers) {
  const channelKeys = Object.keys(CHANNELS)
  const scores = {}

  for (const ch of channelKeys) {
    const qs = QUESTIONS.filter((q) => q.channel === ch)
    const total = qs.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0)
    const maxPossible = qs.length * 5
    scores[ch] = Math.round((total / maxPossible) * 100)
  }

  return scores
}

/**
 * スコアからコメントを生成する（後で詳細化しやすい構造）
 * score: 0-100
 */
export function getChannelComment(channel, score) {
  if (score >= 75) {
    return COMMENTS[channel].high
  } else if (score >= 45) {
    return COMMENTS[channel].mid
  } else {
    return COMMENTS[channel].low
  }
}

const COMMENTS = {
  B: {
    high: 'あなたにとって「意味・信念」は大きな支えになっています。価値観が軸となり、困難に向き合う力を与えてくれているようです。',
    mid: '信念や価値観を活用する場面はありますが、まだ意識化できていない部分もあるかもしれません。',
    low: '今は信念や意味を感じにくい時期かもしれません。小さな「大切にしたいこと」を探すことが助けになるかもしれません。',
  },
  A: {
    high: '感情を感じ、表現することがあなたの大きな力です。感情に正直でいることが、あなたのコーピングを支えています。',
    mid: '感情を活用する力は持っていますが、状況によっては感じにくくなることもあるようです。',
    low: '感情にアクセスすることが難しいと感じているかもしれません。安全な場所で少しずつ感情と向き合う機会を作ることが助けになるかもしれません。',
  },
  S: {
    high: '人とのつながりがあなたの大きな資源です。サポートを求めたり活用したりすることが自然にできているようです。',
    mid: '社会的なつながりを活用する力はありますが、もっと頼れる場面があるかもしれません。',
    low: '今は人に頼ることが難しいと感じているかもしれません。小さな一歩から誰かとつながることが助けになるかもしれません。',
  },
  I: {
    high: '想像力・創造性・ユーモアがあなたの強みです。物事を別の視点で見たり、楽しさの中に希望を見出す力があります。',
    mid: '創造的なアプローチをとる場面はありますが、まだ活かしきれていない可能性があります。',
    low: 'いま想像力を使う余裕がないかもしれません。小さな遊びや創造的な時間が、ストレス解消の糸口になるかもしれません。',
  },
  C: {
    high: '論理的思考・分析があなたの強力なコーピング手段です。考えることで整理し、落ち着きを取り戻す力があります。',
    mid: '思考を活用する場面はありますが、考えすぎて疲れることもあるかもしれません。',
    low: '今は考えることが負担になっているかもしれません。まず感覚や感情から入るアプローチも試してみてください。',
  },
  Ph: {
    high: '身体を使ったコーピングが得意です。体の感覚・運動・呼吸があなたの大切な調整手段になっています。',
    mid: '身体的なアプローチを使う場面はありますが、より意識的に活用できる余地があるかもしれません。',
    low: '今は身体のケアが後回しになっているかもしれません。呼吸や軽い体操など、小さなケアから始めてみましょう。',
  },
}

// localStorage キー
const STORAGE_KEY = 'basicph_history'

export function saveResult(answers, scores) {
  const history = loadHistory()
  const entry = {
    id: Date.now(),
    date: new Date().toLocaleString('ja-JP'),
    answers,
    scores,
  }
  history.unshift(entry)
  // 最大10件保持
  const trimmed = history.slice(0, 10)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
  return entry
}

export function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}
