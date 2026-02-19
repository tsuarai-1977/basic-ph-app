"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS } from "@/constants/questions";

const SCALE_LABELS = [
  "全くそうでない",
  "あまりそうでない",
  "どちらともいえない",
  "ややそうだ",
  "非常にそうだ",
];
import { Answers } from "@/types";
import { calculateScores } from "@/lib/scoring";
import { saveAnswers, saveResult } from "@/lib/storage";

const CHANNEL_COLORS: Record<string, string> = {
  belief: "bg-purple-100 text-purple-800",
  affect: "bg-red-100 text-red-800",
  social: "bg-green-100 text-green-800",
  imagination: "bg-yellow-100 text-yellow-800",
  cognition: "bg-blue-100 text-blue-800",
  physiology: "bg-orange-100 text-orange-800",
};

const CHANNEL_LABELS: Record<string, string> = {
  belief: "意味・価値",
  affect: "感情",
  social: "関係",
  imagination: "想像",
  cognition: "思考",
  physiology: "身体",
};

export default function QuestionsPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers>({});
  const [currentPage, setCurrentPage] = useState(0);

  const QUESTIONS_PER_PAGE = 7;
  const totalPages = Math.ceil(QUESTIONS.length / QUESTIONS_PER_PAGE);
  const startIdx = currentPage * QUESTIONS_PER_PAGE;
  const pageQuestions = QUESTIONS.slice(startIdx, startIdx + QUESTIONS_PER_PAGE);

  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / QUESTIONS.length) * 100);

  const pageFullyAnswered = pageQuestions.every(
    (q) => typeof answers[q.id] === "number"
  );
  const allAnswered = answeredCount === QUESTIONS.length;

  function handleAnswer(questionId: number, value: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function handleNext() {
    if (currentPage < totalPages - 1) {
      setCurrentPage((p) => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleBack() {
    if (currentPage > 0) {
      setCurrentPage((p) => p - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleSubmit() {
    if (!allAnswered) return;
    const result = calculateScores(answers);
    saveAnswers(answers);
    saveResult(result);
    router.push("/result");
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* ヘッダー */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800 mb-1">
          BASIC-Ph セルフ理解ツール
        </h1>
        <p className="text-sm text-gray-500">
          各質問について、0〜4で最も当てはまる数字を選んでください
        </p>
      </div>

      {/* 進捗バー */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>回答済み {answeredCount} / {QUESTIONS.length} 問</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">
          ページ {currentPage + 1} / {totalPages}
        </p>
      </div>

      {/* スケール凡例 */}
      <div className="bg-gray-50 rounded-lg p-3 mb-6 text-xs text-gray-600">
        <div className="flex justify-between">
          {SCALE_LABELS.map((label, i) => (
            <span key={i} className="text-center flex-1">
              <span className="block font-bold text-gray-700">{i}</span>
              <span className="hidden sm:block">{label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 質問リスト */}
      <div className="space-y-6">
        {pageQuestions.map((question) => {
          const selected = answers[question.id];
          const channelColor = CHANNEL_COLORS[question.channel] || "bg-gray-100 text-gray-700";
          const channelLabel = CHANNEL_LABELS[question.channel] || question.channel;

          return (
            <div
              key={question.id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="text-sm font-bold text-gray-400 mt-0.5 shrink-0">
                  Q{question.id}
                </span>
                <div className="flex-1">
                  <span
                    className={`inline-block text-xs px-2 py-0.5 rounded-full mb-2 ${channelColor}`}
                  >
                    {channelLabel}
                  </span>
                  <p className="text-sm text-gray-800 leading-relaxed">
                    {question.text}
                  </p>
                </div>
              </div>

              {/* 0〜4 選択ボタン */}
              <div className="flex gap-2 justify-center">
                {[0, 1, 2, 3, 4].map((value) => (
                  <button
                    key={value}
                    onClick={() => handleAnswer(question.id, value)}
                    className={`w-10 h-10 rounded-lg font-bold text-sm transition-all
                      ${
                        selected === value
                          ? "bg-blue-600 text-white shadow-md scale-105"
                          : "bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-700"
                      }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ナビゲーションボタン */}
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={handleBack}
          disabled={currentPage === 0}
          className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm
            disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          戻る
        </button>

        {currentPage < totalPages - 1 ? (
          <button
            onClick={handleNext}
            disabled={!pageFullyAnswered}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold text-sm
              disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            次へ
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="px-6 py-2 rounded-xl bg-green-600 text-white font-semibold text-sm
              disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
          >
            結果を見る
          </button>
        )}
      </div>
    </div>
  );
}
