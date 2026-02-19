"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ScoreResult, ChannelKey } from "@/types";
import { loadResult } from "@/lib/storage";
import { CHANNELS, CHANNEL_LIST } from "@/constants/channels";

const CHANNEL_COLORS: Record<ChannelKey, { bar: string; badge: string; bg: string }> = {
  belief: {
    bar: "bg-purple-400",
    badge: "bg-purple-100 text-purple-800",
    bg: "bg-purple-50 border-purple-200",
  },
  affect: {
    bar: "bg-red-400",
    badge: "bg-red-100 text-red-800",
    bg: "bg-red-50 border-red-200",
  },
  social: {
    bar: "bg-green-400",
    badge: "bg-green-100 text-green-800",
    bg: "bg-green-50 border-green-200",
  },
  imagination: {
    bar: "bg-yellow-400",
    badge: "bg-yellow-100 text-yellow-800",
    bg: "bg-yellow-50 border-yellow-200",
  },
  cognition: {
    bar: "bg-blue-400",
    badge: "bg-blue-100 text-blue-800",
    bg: "bg-blue-50 border-blue-200",
  },
  physiology: {
    bar: "bg-orange-400",
    badge: "bg-orange-100 text-orange-800",
    bg: "bg-orange-50 border-orange-200",
  },
};

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = loadResult();
    if (!data) {
      router.push("/questions");
      return;
    }
    setResult(data);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* ヘッダー */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          あなたの対処のあり方
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          以下はBASIC-Phに基づく傾向の可視化です。スコアは優劣や能力を示すものではなく、
          あなた自身の対処のあり方の参考としてご活用ください。
        </p>
      </div>

      {/* スコアグラフ */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-600 mb-4">
          チャンネル別スコア
        </h2>
        <div className="space-y-3">
          {CHANNEL_LIST.map((ch) => {
            const score = result.scores[ch.key];
            const colors = CHANNEL_COLORS[ch.key];
            const isTop = result.topChannels.includes(ch.key);
            return (
              <div key={ch.key} className="flex items-center gap-3">
                <div className="w-16 text-right">
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${colors.badge}`}
                  >
                    {ch.label}
                  </span>
                </div>
                <div className="flex-1 bg-gray-100 rounded-full h-4 relative">
                  <div
                    className={`h-4 rounded-full transition-all ${colors.bar}`}
                    style={{ width: `${score.percentage}%` }}
                  />
                </div>
                <div className="w-16 flex items-center gap-1">
                  <span className="text-xs text-gray-600">
                    {score.score}/{score.maxScore}
                  </span>
                  {isTop && (
                    <span className="text-xs text-blue-600 font-bold">*</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-gray-400 mt-3">
          * スコアが比較的多いチャンネルです（優劣を示すものではありません）
        </p>
      </div>

      {/* 各チャンネル詳細 */}
      <div className="space-y-6">
        {CHANNEL_LIST.map((ch) => {
          const colors = CHANNEL_COLORS[ch.key];
          const score = result.scores[ch.key];
          const isTop = result.topChannels.includes(ch.key);
          const channelData = CHANNELS[ch.key];

          return (
            <div
              key={ch.key}
              className={`border rounded-xl p-5 ${colors.bg}`}
            >
              {/* チャンネルタイトル */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors.badge}`}
                >
                  {ch.labelEn}
                </span>
                <h3 className="font-bold text-gray-800">{ch.label}</h3>
                {isTop && (
                  <span className="text-xs bg-white border border-blue-200 text-blue-600 px-2 py-0.5 rounded-full ml-auto">
                    比較的多いチャンネル
                  </span>
                )}
              </div>

              {/* スコア */}
              <p className="text-xs text-gray-500 mb-3">
                スコア: {score.score}/{score.maxScore}
              </p>

              {/* description */}
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                {channelData.description}
              </p>

              {/* 3点コンテンツ */}
              <div className="space-y-4">
                {/* 役に立ちやすい場面 */}
                <div className="bg-white bg-opacity-70 rounded-lg p-4">
                  <h4 className="text-xs font-semibold text-gray-600 mb-2">
                    役に立ちやすい場面
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {channelData.usefulScene}
                  </p>
                </div>

                {/* 行き過ぎたときに起こりやすい疲れ方 */}
                <div className="bg-white bg-opacity-70 rounded-lg p-4">
                  <h4 className="text-xs font-semibold text-gray-600 mb-2">
                    行き過ぎたときに起こりやすい疲れ方
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {channelData.overuseRisk}
                  </p>
                </div>

                {/* 今日できる1分ワーク */}
                <div className="bg-white rounded-lg p-4 border border-white">
                  <h4 className="text-xs font-semibold text-gray-600 mb-2">
                    今日できる1分ワーク
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {channelData.oneMinuteWork}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* アクションボタン */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/share"
          className="inline-block bg-blue-600 text-white text-center px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          PDF で保存する
        </Link>
        <Link
          href="/questions"
          className="inline-block bg-white border border-gray-300 text-gray-700 text-center px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
        >
          もう一度回答する
        </Link>
        <Link
          href="/"
          className="inline-block bg-white border border-gray-300 text-gray-700 text-center px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
        >
          トップに戻る
        </Link>
      </div>
    </div>
  );
}
