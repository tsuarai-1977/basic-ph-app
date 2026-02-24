import { ChannelCode } from "./mvp-types";

export interface ChannelInfo {
  code: ChannelCode;
  label: string;
  description: string;
  color: string;
}

/**
 * 6チャンネル定義（チャクラ象徴カラー・やわらかいトーン）
 * B:Purple / A:Orange / S:LightBlue / I:Pink / C:Yellow / Ph:Red
 */
export const CHANNEL_INFO: Record<ChannelCode, ChannelInfo> = {
  B: {
    code: "B",
    label: "信念",
    description: "意味を見いだす、覚悟を決める、精神的な支えを持つ など",
    color: "#C4B5FD",
  },
  A: {
    code: "A",
    label: "感情",
    description: "喜怒哀楽を感じる、表現する、歌う、楽器を演奏する など",
    color: "#FDBA74",
  },
  S: {
    code: "S",
    label: "社会",
    description:
      "人や動物との関係を大切にする、助けを求める、支え合う、所属する など",
    color: "#7DD3FC",
  },
  I: {
    code: "I",
    label: "想像",
    description:
      "芸術、映画、ゲーム、小説などを通して別の視点を持つ。ごっこ遊びや空想、物語として捉える など",
    color: "#F9A8D4",
  },
  C: {
    code: "C",
    label: "認知",
    description: "現実的に分析する、問題を解決する、計画を立てる など",
    color: "#FDE68A",
  },
  Ph: {
    code: "Ph",
    label: "身体",
    description:
      "食べる、飲む、料理をする、身体を動かす、休む、瞑想する など",
    color: "#FCA5A5",
  },
};

/** チャンネル順序（固定） */
export const CHANNEL_ORDER: ChannelCode[] = ["B", "A", "S", "I", "C", "Ph"];
