// constants/questions.ts
// FINAL (LOCKED) — BASIC-Ph 28 questions (copypaste as-is)
// 仕様：診断・治療・指導にならない／効果・評価語は極力排除／「選好・傾向」を問う
// ChannelKey: belief / affect / social / imagination / cognition / physiology

import { Question } from "@/types";

export const QUESTIONS: Question[] = [
  // ── belief（信念・意味・価値）1〜5 ─────────────────────────
  {
    id: 1,
    channel: "belief",
    text: "つらいことがあったとき、「これには何か意味があるかもしれない」と考えることがある。",
  },
  {
    id: 2,
    channel: "belief",
    text: "自分が大切にしている価値観や信念を、困難な場面で意識することがある。",
  },
  {
    id: 3,
    channel: "belief",
    text: "人生や出来事に対して、自分なりの「意味づけ」をすることがある。",
  },
  {
    id: 4,
    channel: "belief",
    text: "宗教・哲学・精神的な考え方など、自分の拠り所となる思想や信条がある。",
  },
  {
    id: 5,
    channel: "belief",
    text: "困ったとき、「自分が何のためにこれをしているか」を思い出すことがある。",
  },

  // ── affect（感情）6〜10 ───────────────────────────────────
  {
    id: 6,
    channel: "affect",
    text: "気持ちが落ち込んだとき、泣いたり感情を表に出したりすることがある。",
  },
  {
    id: 7,
    channel: "affect",
    text: "自分の感情を言葉や表情で表現することがある。",
  },
  {
    id: 8,
    channel: "affect",
    text: "好きな音楽を聴いたり、歌ったりすることがある。",
  },
  {
    id: 9,
    channel: "affect",
    text: "自分の気持ちをそのまま言葉にすることがある。",
  },
  {
    id: 10,
    channel: "affect",
    text: "喜怒哀楽の感情に意識を向けることがある。",
  },

  // ── social（関係）11〜15 ──────────────────────────────────
  {
    id: 11,
    channel: "social",
    text: "困ったとき、誰かに相談したり、一緒にいてもらうことを選ぶことがある。",
  },
  {
    id: 12,
    channel: "social",
    text: "問題や悩みがあるとき、誰かに助けを求めることを選ぶことがある。",
  },
  {
    id: 13,
    channel: "social",
    text: "誰かと一緒に何かをする関係を好むことがある。",
  },
  {
    id: 14,
    channel: "social",
    text: "チームや集団の中にいる関係を好むことがある。",
  },
  {
    id: 15,
    channel: "social",
    text: "悩みがあるとき、周囲と関わることを選ぶことがある。",
  },

  // ── imagination（想像）16〜19 ─────────────────────────────
  {
    id: 16,
    channel: "imagination",
    text: "空想・物語・アートなど、「現実とは別の世界」に意識を向けることがある。",
  },
  {
    id: 17,
    channel: "imagination",
    text: "絵を描いたり、文章を書いたり、音楽を奏でるなど、創造的な活動に取り組むことがある。",
  },
  {
    id: 18,
    channel: "imagination",
    text: "ゲームをしたり、漫画やアニメを観ることがある。",
  },
  {
    id: 19,
    channel: "imagination",
    text: "夢想・妄想・ファンタジーなど、頭の中で自由に遊ぶことがある。",
  },

  // ── cognition（思考）20〜24 ───────────────────────────────
  {
    id: 20,
    channel: "cognition",
    text: "問題が起きたとき、状況を整理して原因や解決策を考えることがある。",
  },
  {
    id: 21,
    channel: "cognition",
    text: "情報を集めたり、計画を立てたりすることがある。",
  },
  {
    id: 22,
    channel: "cognition",
    text: "物事を分析したり、リストや図にまとめたりすることがある。",
  },
  {
    id: 23,
    channel: "cognition",
    text: "本を読んだり、学んだりして知識を得ることがある。",
  },
  {
    id: 24,
    channel: "cognition",
    text: "困難な状況でも、「どうすれば改善できるか」を考え続けることがある。",
  },

  // ── physiology（身体）25〜28 ──────────────────────────────
  {
    id: 25,
    channel: "physiology",
    text: "体を動かすこと自体が好きである。",
  },
  {
    id: 26,
    channel: "physiology",
    text: "食べ物や飲み物を味わう時間が好きである。",
  },
  {
    id: 27,
    channel: "physiology",
    text: "服の手触りや着心地など、肌に触れる感覚が好きである。",
  },
  {
    id: 28,
    channel: "physiology",
    text: "自然の中に身を置いたり、外の空気や光を感じることが好きである。",
  },
];

// Optional: sanity check (dev only)
// export const QUESTION_COUNT_BY_CHANNEL = QUESTIONS.reduce((acc, q) => {
//   acc[q.channel] = (acc[q.channel] ?? 0) + 1;
//   return acc;
// }, {} as Record<string, number>);
