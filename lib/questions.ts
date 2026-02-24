// ── BASIC-Ph チャンネル型 ─────────────────────────────────
export type Channel = 'B' | 'A' | 'S' | 'I' | 'C' | 'Ph'

// 各質問に対して primary チャンネルに 3点、secondary チャンネルに 1点を配点
export const PRIMARY_WEIGHT = 3
export const SECONDARY_WEIGHT = 1

export type Question = {
  id: number
  text: string
  primary: Channel   // 主配点チャンネル（3点）
  secondary: Channel // 副配点チャンネル（1点）
}

// ── 12問定義（後から自由に編集可） ──────────────────────────
// 回答は 0=まったく / 1=少し / 2=わりと / 3=とても
export const QUESTIONS: Question[] = [
  // B（信念・意味・価値観）
  { id: 1,  text: '困難な状況でも、何か意味や目的を見出そうとする',         primary: 'B',  secondary: 'A'  },
  { id: 2,  text: '自分の価値観や信念に沿って行動することを大切にする',     primary: 'B',  secondary: 'C'  },
  // A（感情表現）
  { id: 3,  text: '気持ちを話したり、泣いたり、感情を外に出す',             primary: 'A',  secondary: 'B'  },
  { id: 4,  text: '音楽・歌・絵など、感情を表現する活動をする',             primary: 'A',  secondary: 'I'  },
  // S（社会・つながり）
  { id: 5,  text: '誰かに助けを求めたり、そばにいてもらう',                 primary: 'S',  secondary: 'A'  },
  { id: 6,  text: '家族や友人と話して、つながりを感じる',                   primary: 'S',  secondary: 'Ph' },
  // I（想像・イメージ）
  { id: 7,  text: '想像・空想・創作などで気持ちを切り替える',               primary: 'I',  secondary: 'A'  },
  { id: 8,  text: '本・映画・ゲームなど、物語の世界に入り込む',             primary: 'I',  secondary: 'S'  },
  // C（認知・整理）
  { id: 9,  text: '状況を整理したり、計画を立てて対処する',                 primary: 'C',  secondary: 'B'  },
  { id: 10, text: '情報を調べたり、問題の原因を理解しようとする',           primary: 'C',  secondary: 'S'  },
  // Ph（身体・行動・休息）
  { id: 11, text: '体を動かしたり、十分に休んで体のケアをする',             primary: 'Ph', secondary: 'C'  },
  { id: 12, text: '食事・入浴など、日常の身体ケアを丁寧に行う',             primary: 'Ph', secondary: 'I'  },
]

export const CHANNEL_ORDER: Channel[] = ['B', 'A', 'S', 'I', 'C', 'Ph']
