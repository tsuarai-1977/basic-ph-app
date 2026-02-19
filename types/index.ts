/**
 * BASIC-Ph アプリ 型定義
 */

export type ChannelKey =
  | "belief"
  | "affect"
  | "social"
  | "imagination"
  | "cognition"
  | "physiology";

export interface ChannelMeta {
  key: ChannelKey;
  label: string;
  labelEn: string;
  description: string;
  usefulScene: string;
  overuseRisk: string;
  oneMinuteWork: string;
}

export interface Question {
  id: number;
  channel: ChannelKey;
  text: string;
}

export interface Answers {
  [questionId: number]: number; // 0〜4
}

export interface ChannelScore {
  channel: ChannelKey;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface ScoreResult {
  scores: Record<ChannelKey, ChannelScore>;
  topChannels: ChannelKey[];
}
