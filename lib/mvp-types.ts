export type ChannelCode = "B" | "A" | "S" | "I" | "C" | "Ph";

export interface Card {
  id: string;
  channel: ChannelCode;
  title: string;
  why: string;
  steps: string[];
  duration_sec: number;
}

export interface HistoryEntry {
  timestamp: string;
  q1_choice: string;
  q2_choice: string;
  primary1: ChannelCode;
  primary2: ChannelCode;
  activated_card_ids: string[];
  explore_card_ids: string[];
}

export interface AssessmentResult {
  q1_choice: string;
  q2_choice: string;
  primary1: ChannelCode;
  primary2: ChannelCode;
  activated_cards: Card[];
  explore_cards: Card[];
}
