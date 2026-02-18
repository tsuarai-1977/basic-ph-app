import { Question } from "@/types";

/**
 * BASIC-Ph 28問（チャンネル別）
 * 各問：0（全くそうでない）〜 4（非常にそうだ）で回答
 *
 * チャンネル別問数：
 * - belief: 5問（Q1〜Q5）
 * - affect: 5問（Q6〜Q10）
 * - social: 4問（Q11〜Q14）
 * - imagination: 5問（Q15〜Q19）
 * - cognition: 5問（Q20〜Q24）
 * - physiology: 4問（Q25〜Q28）
 */
export const QUESTIONS: Question[] = [
  // Belief & Value（意味・価値）
  {
    id: 1,
    channel: "belief",
    text: "つらいことがあっても、それには何か意味があると感じることがある",
  },
  {
    id: 2,
    channel: "belief",
    text: "自分が大切にしている価値観や信念が、困難な状況を乗り越える力になっていると感じる",
  },
  {
    id: 3,
    channel: "belief",
    text: "出来事に「なぜ」と問いかけることで、気持ちを整理しようとする",
  },
  {
    id: 4,
    channel: "belief",
    text: "自分の人生に一貫したテーマや方向性があると感じる",
  },
  {
    id: 5,
    channel: "belief",
    text: "信仰・哲学・信条など、自分なりの拠り所となる考え方を持っている",
  },

  // Affect（感情）
  {
    id: 6,
    channel: "affect",
    text: "感情を素直に表現することで、気持ちが楽になることがある",
  },
  {
    id: 7,
    channel: "affect",
    text: "悲しいときには泣いたり、うれしいときには声に出して喜んだりする",
  },
  {
    id: 8,
    channel: "affect",
    text: "音楽・映画・本など、感情を動かすものに触れることで心が整う",
  },
  {
    id: 9,
    channel: "affect",
    text: "自分の感情を人に打ち明けることで、楽になった経験がある",
  },
  {
    id: 10,
    channel: "affect",
    text: "感情を感じきることが、自分を立て直すひとつの方法になっている",
  },

  // Social（関係）
  {
    id: 11,
    channel: "social",
    text: "誰かそばにいるだけで、気持ちが安定することがある",
  },
  {
    id: 12,
    channel: "social",
    text: "友人・家族・コミュニティとのつながりが、自分の支えになっていると感じる",
  },
  {
    id: 13,
    channel: "social",
    text: "困ったときに誰かに頼ったり、助けを求めることができる",
  },
  {
    id: 14,
    channel: "social",
    text: "人と一緒に何かをすることで、元気が出ることがある",
  },

  // Imagination（想像）
  {
    id: 15,
    channel: "imagination",
    text: "読書・映画・ゲームなどのフィクションの世界に入り込むことで、気持ちが切り替わる",
  },
  {
    id: 16,
    channel: "imagination",
    text: "空想・白昼夢・イメージの世界に浸ることが、休息になっている",
  },
  {
    id: 17,
    channel: "imagination",
    text: "絵を描く・文章を書く・音楽を作るなど、創造的な活動で気持ちを表現することがある",
  },
  {
    id: 18,
    channel: "imagination",
    text: "「もしこうだったら」と別の可能性を想像することで、気分が楽になることがある",
  },
  {
    id: 19,
    channel: "imagination",
    text: "夢や目標を思い描くことが、自分を動かす力になっている",
  },

  // Cognition（思考）
  {
    id: 20,
    channel: "cognition",
    text: "状況を整理・分析することで、気持ちが落ち着くことがある",
  },
  {
    id: 21,
    channel: "cognition",
    text: "問題が起きたとき、まず情報を集めて原因を考える",
  },
  {
    id: 22,
    channel: "cognition",
    text: "計画を立て、手順を整理することで、不安が和らぐことがある",
  },
  {
    id: 23,
    channel: "cognition",
    text: "本やネットで調べ、知識を得ることが自分の支えになることがある",
  },
  {
    id: 24,
    channel: "cognition",
    text: "頭の中を整理するためにメモや日記を書くことがある",
  },

  // Physiology（身体）
  {
    id: 25,
    channel: "physiology",
    text: "散歩・運動・ストレッチなど、身体を動かすことで気持ちが切り替わる",
  },
  {
    id: 26,
    channel: "physiology",
    text: "深呼吸・リラクゼーション・入浴など、身体に働きかけることで落ち着くことがある",
  },
  {
    id: 27,
    channel: "physiology",
    text: "食事・睡眠・休息を大切にすることが、自分を整える方法になっている",
  },
  {
    id: 28,
    channel: "physiology",
    text: "身体の感覚（呼吸・温もり・緊張など）に意識を向けることで、気持ちが安定することがある",
  },
];

export const SCALE_LABELS = [
  "全くそうでない",
  "あまりそうでない",
  "どちらともいえない",
  "ややそうだ",
  "非常にそうだ",
];
