"use client";

import { useEffect } from "react";
import { Card } from "@/lib/mvp-types";
import { CHANNEL_INFO } from "@/lib/mvp-channels";
import ChannelChip from "./ChannelChip";

interface Props {
  card: Card;
  onClose: () => void;
}

/**
 * カード詳細モーダル
 * ×ボタン or 背景タップで閉じる（スマホ対応）
 */
export default function CardModal({ card, onClose }: Props) {
  const info = CHANNEL_INFO[card.channel];
  const durationMin = Math.floor(card.duration_sec / 60);
  const durationSec = card.duration_sec % 60;
  const durationLabel =
    durationSec === 0
      ? `約${durationMin}分`
      : `約${durationMin}分${durationSec}秒`;

  // スクロールロック
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Escキーで閉じる
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* 背景オーバーレイ */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* モーダル本体 */}
      <div className="relative bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden max-h-[85vh] flex flex-col">
        {/* カラーライン */}
        <div
          className="w-full h-1 shrink-0"
          style={{ backgroundColor: info.color }}
        />

        {/* ヘッダー */}
        <div className="flex items-start justify-between px-5 pt-4 pb-3 border-b border-gray-100 shrink-0">
          <div>
            <ChannelChip code={card.channel} size="sm" />
            <h2 className="text-lg font-bold text-gray-800 mt-1.5 leading-snug">
              {card.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="ml-4 shrink-0 w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 text-xl"
            aria-label="閉じる"
          >
            ×
          </button>
        </div>

        {/* コンテンツ */}
        <div className="overflow-y-auto px-5 py-4 space-y-4">
          {/* why */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
              なぜこれ？
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">{card.why}</p>
          </div>

          {/* steps */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              やり方
            </p>
            <ol className="space-y-2">
              {card.steps.map((step, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700">
                  <span
                    className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5"
                    style={{ backgroundColor: info.color }}
                  >
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* duration */}
          <div className="flex items-center gap-2 text-xs text-gray-400 border-t border-gray-100 pt-3">
            <span>⏱</span>
            <span>{durationLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
