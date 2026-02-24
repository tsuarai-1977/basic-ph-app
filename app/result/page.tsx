"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AssessmentResult } from "@/lib/mvp-types";
import { loadSession } from "@/lib/mvp-storage";
import { CHANNEL_INFO, CHANNEL_ORDER } from "@/lib/mvp-channels";
import ChannelChip from "@/components/ChannelChip";

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    const data = loadSession();
    if (!data) {
      router.push("/assessment");
      return;
    }
    setResult(data);
  }, [router]);

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-400 text-sm">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
      {/* タイトル（固定） */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 leading-snug">
          あなたに馴染みがある対処チャンネル（BASIC-Ph）
        </h2>
        {/* 回答の事実表示（評価なし） */}
        <div className="text-sm text-gray-500 space-y-0.5">
          <p>あなたが選んだ行動：{result.q1_choice}</p>
          <p>あなたが持っていくもの：{result.q2_choice}</p>
        </div>
      </div>

      {/* 共通説明（固定・3文） */}
      <div className="bg-white rounded-2xl px-5 py-5 shadow-sm border border-gray-100 space-y-2">
        <p className="text-sm text-gray-700 leading-relaxed">
          私たちは誰でも、6つの対処を持っています。
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          その中に、自然に使いやすい対処があります。
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          BASIC-Phでは、すでにある対処に注目し、それを活性化していきます。そのうえで、ほかの対処も少しずつ広げていきます。
        </p>
      </div>

      {/* チャンネル一覧（全6件・必ず表示） */}
      <div className="space-y-2">
        {CHANNEL_ORDER.map((code) => {
          const info = CHANNEL_INFO[code];
          return (
            <div
              key={code}
              className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3.5 flex gap-3 items-start"
            >
              {/* 色chip */}
              <span
                className="w-3 h-3 rounded-full shrink-0 mt-1"
                style={{ backgroundColor: info.color }}
              />
              <div>
                <ChannelChip code={code} size="sm" />
                <p className="text-xs text-gray-500 leading-relaxed mt-1">
                  {info.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* アクションボタン（2つ） */}
      <div className="space-y-3 pb-8">
        <Link
          href="/recommendations#activate"
          className="block w-full py-4 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white font-bold text-base text-center rounded-2xl shadow-md transition-colors"
        >
          活性化する提案
        </Link>
        <Link
          href="/recommendations#explore"
          className="block w-full py-4 bg-white border-2 border-violet-300 hover:bg-violet-50 active:bg-violet-100 text-violet-700 font-bold text-base text-center rounded-2xl transition-colors"
        >
          少し広げてみる
        </Link>
      </div>
    </div>
  );
}
