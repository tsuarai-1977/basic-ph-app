"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HistoryEntry } from "@/lib/mvp-types";
import { loadHistory, clearHistory } from "@/lib/mvp-storage";
import { CHANNEL_INFO } from "@/lib/mvp-channels";

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function ChannelBadge({ code }: { code: string }) {
  const info = CHANNEL_INFO[code as keyof typeof CHANNEL_INFO];
  if (!info) return null;
  return (
    <span
      className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium"
      style={{
        backgroundColor: info.color + "33",
        color: "#374151",
      }}
    >
      <span
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: info.color }}
      />
      {code}｜{info.label}
    </span>
  );
}

export default function HistoryPage() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setEntries(loadHistory());
    setLoaded(true);
  }, []);

  function handleClear() {
    clearHistory();
    setEntries([]);
  }

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-400 text-sm">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-gray-800">過去の記録</h2>
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600">
          ← 戻る
        </Link>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-sm">まだ記録がありません。</p>
          <Link
            href="/assessment"
            className="mt-6 inline-block bg-violet-500 text-white text-sm font-bold px-6 py-3 rounded-2xl hover:bg-violet-600"
          >
            はじめてみる
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-8">
            {entries.map((entry, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-4 space-y-3"
              >
                {/* 日時 */}
                <p className="text-xs text-gray-400">{formatDate(entry.timestamp)}</p>

                {/* 回答 */}
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">
                    Q1：<span className="text-gray-700 font-medium">{entry.q1_choice}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Q2：<span className="text-gray-700 font-medium">{entry.q2_choice}</span>
                  </p>
                </div>

                {/* チャンネル */}
                <div className="flex flex-wrap gap-2">
                  <ChannelBadge code={entry.primary1} />
                  {entry.primary2 !== entry.primary1 && (
                    <ChannelBadge code={entry.primary2} />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 削除ボタン */}
          <button
            onClick={handleClear}
            className="w-full py-3.5 bg-white border border-red-200 text-red-400 font-medium text-sm rounded-2xl hover:bg-red-50 active:bg-red-100 transition-colors"
          >
            履歴を全て削除
          </button>
        </>
      )}
    </div>
  );
}
