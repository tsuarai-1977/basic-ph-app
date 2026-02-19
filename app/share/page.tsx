"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ScoreResult, ChannelKey } from "@/types";
import { loadResult } from "@/lib/storage";
import { CHANNELS, CHANNEL_LIST } from "@/constants/channels";

const CHANNEL_COLORS: Record<ChannelKey, { bar: string; badge: string }> = {
  belief: { bar: "bg-purple-400", badge: "bg-purple-100 text-purple-800" },
  affect: { bar: "bg-red-400", badge: "bg-red-100 text-red-800" },
  social: { bar: "bg-green-400", badge: "bg-green-100 text-green-800" },
  imagination: { bar: "bg-yellow-400", badge: "bg-yellow-100 text-yellow-800" },
  cognition: { bar: "bg-blue-400", badge: "bg-blue-100 text-blue-800" },
  physiology: { bar: "bg-orange-400", badge: "bg-orange-100 text-orange-800" },
};

export default function SharePage() {
  const router = useRouter();
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [loading, setLoading] = useState(true);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = loadResult();
    if (!data) {
      router.push("/questions");
      return;
    }
    setResult(data);
    setLoading(false);
  }, [router]);

  function handlePrint() {
    window.print();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }

  if (!result) return null;

  return (
    <>
      {/* 印刷用スタイル */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { font-size: 12px; }
          .print-container { padding: 0; margin: 0; }
        }
      `}</style>

      <div className="max-w-2xl mx-auto px-4 py-8 print-container" ref={printRef}>
        {/* ヘッダー（非印刷：ボタン類） */}
        <div className="no-print mb-6 flex items-center justify-between">
          <Link href="/result" className="text-sm text-blue-600 hover:underline">
            ← 結果に戻る
          </Link>
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors"
          >
            PDF として保存 / 印刷
          </button>
        </div>

        {/* 印刷コンテンツ */}
        <div className="bg-white">
          {/* タイトル */}
          <div className="text-center mb-6 pb-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-800">
              BASIC-Ph セルフ理解ツール 結果レポート
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              多次元対処モデルに基づく自己理解・自己対処の可視化
            </p>
            <p className="text-xs text-gray-400 mt-1">
              作成日：{new Date().toLocaleDateString("ja-JP")}
            </p>
          </div>

          {/* スコアグラフ */}
          <div className="mb-6">
            <h2 className="text-sm font-bold text-gray-700 mb-3">
              チャンネル別スコア
            </h2>
            <div className="space-y-2">
              {CHANNEL_LIST.map((ch) => {
                const score = result.scores[ch.key];
                const colors = CHANNEL_COLORS[ch.key];
                const isTop = result.topChannels.includes(ch.key);
                return (
                  <div key={ch.key} className="flex items-center gap-3">
                    <div className="w-20 text-right">
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${colors.badge}`}>
                        {ch.label}
                      </span>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${colors.bar}`}
                        style={{ width: `${score.percentage}%` }}
                      />
                    </div>
                    <div className="w-16 text-xs text-gray-600">
                      {score.score}/{score.maxScore}{isTop ? " *" : ""}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              * スコアが比較的多いチャンネルです（優劣を示すものではありません）
            </p>
          </div>

          {/* 各チャンネル詳細 */}
          <div className="space-y-5">
            {CHANNEL_LIST.map((ch) => {
              const channelData = CHANNELS[ch.key];
              const score = result.scores[ch.key];
              const isTop = result.topChannels.includes(ch.key);
              const colors = CHANNEL_COLORS[ch.key];

              return (
                <div key={ch.key} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors.badge}`}>
                      {ch.labelEn}
                    </span>
                    <span className="font-bold text-sm text-gray-800">{ch.label}</span>
                    {isTop && (
                      <span className="text-xs text-blue-600 ml-auto">
                        比較的多いチャンネル
                      </span>
                    )}
                    <span className="text-xs text-gray-400 ml-auto">
                      {score.score}/{score.maxScore}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed mb-3">
                    {channelData.description}
                  </p>

                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-1">
                        役に立ちやすい場面
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {channelData.usefulScene}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-1">
                        行き過ぎたときに起こりやすい疲れ方
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {channelData.overuseRisk}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-1">
                        今日できる1分ワーク
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {channelData.oneMinuteWork}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 免責（印刷用・フッター強化） */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-400 leading-relaxed text-center">
              本ツールはBASIC-Phに基づく自己理解・自己対処の可視化を目的としており、医学的・心理学的な診断を行うものではありません。結果は「あなたの対処のあり方の傾向」を示す参考情報であり、優劣・正常異常の判定を含みません。心身の不調や専門的なサポートが必要と感じる場合は、医療機関や専門家にご相談ください。
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
