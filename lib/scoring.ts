import { Answers, ChannelKey, ChannelScore, ScoreResult } from "@/types";
import { QUESTIONS } from "@/constants/questions";

/**
 * チャンネルごとの最大スコア（問数 × 4）
 */
const CHANNEL_QUESTION_COUNTS: Record<ChannelKey, number> = {
  belief: 5,
  affect: 5,
  social: 5,
  imagination: 4,
  cognition: 5,
  physiology: 4,
};

/**
 * 回答データからチャンネル別スコアを計算する
 */
export function calculateScores(answers: Answers): ScoreResult {
  // チャンネルごとに合計スコアを集計
  const rawScores: Record<ChannelKey, number> = {
    belief: 0,
    affect: 0,
    social: 0,
    imagination: 0,
    cognition: 0,
    physiology: 0,
  };

  for (const question of QUESTIONS) {
    const answer = answers[question.id];
    if (typeof answer === "number") {
      rawScores[question.channel] += answer;
    }
  }

  // チャンネルスコアオブジェクトを生成
  const scores: Record<ChannelKey, ChannelScore> = {} as Record<
    ChannelKey,
    ChannelScore
  >;

  const channelKeys: ChannelKey[] = [
    "belief",
    "affect",
    "social",
    "imagination",
    "cognition",
    "physiology",
  ];

  for (const key of channelKeys) {
    const questionCount = CHANNEL_QUESTION_COUNTS[key];
    const maxScore = questionCount * 4;
    const score = rawScores[key];
    scores[key] = {
      channel: key,
      score,
      maxScore,
      percentage: maxScore > 0 ? Math.round((score / maxScore) * 100) : 0,
    };
  }

  // 上位チャンネルを特定（スコアの高い順、同率はチャンネル順を維持）
  const topChannels = channelKeys
    .slice()
    .sort((a, b) => scores[b].score - scores[a].score)
    .slice(0, 3);

  return { scores, topChannels };
}
