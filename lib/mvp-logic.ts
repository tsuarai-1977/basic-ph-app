/**
 * mvp-logic.ts
 * 固定マッピング + カード選択ロジック（ランダム禁止）
 */
import { ChannelCode, Card, AssessmentResult } from "./mvp-types";
import { CARDS } from "./mvp-cards";
import { CHANNEL_ORDER } from "./mvp-channels";

// ── Q1 マッピング（固定） ──────────────────────────────────
export const Q1_OPTIONS = [
  "覚悟を決める",
  "泣く",
  "誰かと一緒に過ごす",
  "ぼーっとする",
  "状況を整理してみる",
  "寝る",
] as const;

const Q1_MAP: Record<string, ChannelCode> = {
  覚悟を決める: "B",
  泣く: "A",
  誰かと一緒に過ごす: "S",
  ぼーっとする: "I",
  状況を整理してみる: "C",
  寝る: "Ph",
};

// ── Q2 マッピング（固定） ──────────────────────────────────
export const Q2_OPTIONS = [
  "お守り",
  "楽器",
  "ペットや家族の写真",
  "小説",
  "地図",
  "常備薬",
] as const;

const Q2_MAP: Record<string, ChannelCode> = {
  お守り: "B",
  楽器: "A",
  ペットや家族の写真: "S",
  小説: "I",
  地図: "C",
  常備薬: "Ph",
};

// ── ヘルパー ───────────────────────────────────────────────
function cardsByChannel(channel: ChannelCode): Card[] {
  return CARDS.filter((c) => c.channel === channel);
}

// ── カード選択ロジック（固定・ランダム禁止） ──────────────
export function calculateResult(q1: string, q2: string): AssessmentResult {
  const primary1 = Q1_MAP[q1];
  const primary2 = Q2_MAP[q2];

  // 活性化カード（3枚）
  let activated_cards: Card[];
  if (primary1 === primary2) {
    // 同チャンネル → 先頭3枚
    activated_cards = cardsByChannel(primary1).slice(0, 3);
  } else {
    // 異チャンネル → primary1から2枚, primary2から1枚
    const p1 = cardsByChannel(primary1).slice(0, 2);
    const p2 = cardsByChannel(primary2).slice(0, 1);
    activated_cards = [...p1, ...p2];
  }

  // 探索カード（2枚）
  // primary1, primary2 以外のチャンネルを B,A,S,I,C,Ph 順で最初の2つ選択
  const exploreChannels = CHANNEL_ORDER.filter(
    (ch) => ch !== primary1 && ch !== primary2
  ).slice(0, 2);
  const explore_cards = exploreChannels.map((ch) => cardsByChannel(ch)[0]);

  return {
    q1_choice: q1,
    q2_choice: q2,
    primary1,
    primary2,
    activated_cards,
    explore_cards,
  };
}
