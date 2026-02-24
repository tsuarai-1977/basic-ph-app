import { AssessmentResult, HistoryEntry } from "./mvp-types";

const SESSION_KEY = "basicph_mvp_session";
const HISTORY_KEY = "basicph_mvp_history";

// ── セッション（画面間データ受け渡し） ───────────────────
export function saveSession(result: AssessmentResult): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(result));
}

export function loadSession(): AssessmentResult | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AssessmentResult) : null;
  } catch {
    return null;
  }
}

// ── 履歴（localStorage） ─────────────────────────────────
export function appendHistory(result: AssessmentResult): void {
  if (typeof window === "undefined") return;
  const entry: HistoryEntry = {
    timestamp: new Date().toISOString(),
    q1_choice: result.q1_choice,
    q2_choice: result.q2_choice,
    primary1: result.primary1,
    primary2: result.primary2,
    activated_card_ids: result.activated_cards.map((c) => c.id),
    explore_card_ids: result.explore_cards.map((c) => c.id),
  };
  const existing = loadHistory();
  existing.unshift(entry);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(existing));
}

export function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(HISTORY_KEY);
}
