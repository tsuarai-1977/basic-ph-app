import { Answers, ScoreResult } from "@/types";

const ANSWERS_KEY = "basicph_answers";
const RESULT_KEY = "basicph_result";

/**
 * 回答データを sessionStorage に保存する
 */
export function saveAnswers(answers: Answers): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
}

/**
 * sessionStorage から回答データを取得する
 */
export function loadAnswers(): Answers | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(ANSWERS_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Answers;
  } catch {
    return null;
  }
}

/**
 * スコア結果を sessionStorage に保存する
 */
export function saveResult(result: ScoreResult): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(RESULT_KEY, JSON.stringify(result));
}

/**
 * sessionStorage からスコア結果を取得する
 */
export function loadResult(): ScoreResult | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(RESULT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ScoreResult;
  } catch {
    return null;
  }
}

/**
 * sessionStorage のデータをすべてクリアする
 */
export function clearStorage(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(ANSWERS_KEY);
  sessionStorage.removeItem(RESULT_KEY);
}
