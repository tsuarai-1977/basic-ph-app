"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Q1_OPTIONS, Q2_OPTIONS, calculateResult } from "@/lib/mvp-logic";
import { saveSession, appendHistory } from "@/lib/mvp-storage";

export default function AssessmentPage() {
  const router = useRouter();
  const [q1, setQ1] = useState<string | null>(null);
  const [q2, setQ2] = useState<string | null>(null);

  const canSubmit = q1 !== null && q2 !== null;

  function handleSubmit() {
    if (!q1 || !q2) return;
    const result = calculateResult(q1, q2);
    saveSession(result);
    appendHistory(result);
    router.push("/result");
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-8">
      {/* 導入文（固定） */}
      <div className="bg-white rounded-2xl px-5 py-5 shadow-sm border border-gray-100">
        <p className="text-base text-gray-700 leading-relaxed font-medium">
          あなたは急に、明日「見知らぬ土地」に行かなければならなくなりました。
        </p>
      </div>

      {/* Q1 */}
      <section>
        <h2 className="text-base font-bold text-gray-800 mb-3 leading-snug">
          Q1．行く前に、あなたは何をしますか？
          <span className="ml-2 text-xs font-normal text-gray-400">
            （1つ選択）
          </span>
        </h2>
        <div className="space-y-2">
          {Q1_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => setQ1(opt)}
              className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-colors
                ${
                  q1 === opt
                    ? "bg-violet-50 border-violet-400 text-violet-800"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </section>

      {/* Q2 */}
      <section>
        <h2 className="text-base font-bold text-gray-800 mb-3 leading-snug">
          Q2．1つだけ持っていくことができるとしたら何を持っていきますか？
          <span className="ml-2 text-xs font-normal text-gray-400">
            （1つ選択）
          </span>
        </h2>
        <div className="space-y-2">
          {Q2_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => setQ2(opt)}
              className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-colors
                ${
                  q2 === opt
                    ? "bg-violet-50 border-violet-400 text-violet-800"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </section>

      {/* 送信ボタン */}
      <div className="pb-8">
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`w-full py-4 rounded-2xl font-bold text-base transition-colors
            ${
              canSubmit
                ? "bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white shadow-md"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          結果を見る
        </button>
      </div>
    </div>
  );
}
