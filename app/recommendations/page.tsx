"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AssessmentResult, Card } from "@/lib/mvp-types";
import { loadSession } from "@/lib/mvp-storage";
import { CHANNEL_INFO } from "@/lib/mvp-channels";
import ChannelChip from "@/components/ChannelChip";
import CardModal from "@/components/CardModal";
import { Suspense } from "react";

// ── 個別カードコンポーネント ──────────────────────────────
function CardItem({
  card,
  onOpen,
}: {
  card: Card;
  onOpen: (card: Card) => void;
}) {
  const info = CHANNEL_INFO[card.channel];
  const durationMin = Math.floor(card.duration_sec / 60);
  const durationLabel = `約${durationMin}分`;

  return (
    <button
      onClick={() => onOpen(card)}
      className="w-full text-left bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md active:scale-[0.99] transition-all"
    >
      {/* チャンネルカラーライン（4px） */}
      <div className="h-1" style={{ backgroundColor: info.color }} />
      <div className="px-4 py-4">
        <ChannelChip code={card.channel} size="sm" />
        <p className="text-base font-bold text-gray-800 mt-2 leading-snug">
          {card.title}
        </p>
        <p className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-2">
          {card.why}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-gray-400">{durationLabel}</span>
          <span className="text-xs text-violet-500 font-medium">詳しく見る →</span>
        </div>
      </div>
    </button>
  );
}

// ── アンカースクロール処理コンポーネント ─────────────────
function AnchorScroller({
  activateRef,
  exploreRef,
}: {
  activateRef: React.RefObject<HTMLElement | null>;
  exploreRef: React.RefObject<HTMLElement | null>;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    // URLハッシュを読んでスクロール
    const hash = window.location.hash;
    if (hash === "#explore" && exploreRef.current) {
      setTimeout(() => {
        exploreRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else if (hash === "#activate" && activateRef.current) {
      setTimeout(() => {
        activateRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

// ── メインページ ─────────────────────────────────────────
export default function RecommendationsPage() {
  const router = useRouter();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [openCard, setOpenCard] = useState<Card | null>(null);
  const activateRef = useRef<HTMLElement | null>(null);
  const exploreRef = useRef<HTMLElement | null>(null);

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
    <>
      <Suspense fallback={null}>
        <AnchorScroller activateRef={activateRef} exploreRef={exploreRef} />
      </Suspense>

      <div className="max-w-xl mx-auto px-4 py-6 space-y-10 pb-12">
        {/* ── 活性化する提案 ── */}
        <section
          id="activate"
          ref={(el) => { activateRef.current = el; }}
        >
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            活性化する提案
          </h2>
          <div className="space-y-3">
            {result.activated_cards.map((card) => (
              <CardItem key={card.id} card={card} onOpen={setOpenCard} />
            ))}
          </div>
        </section>

        {/* ── 少し広げてみる ── */}
        <section
          id="explore"
          ref={(el) => { exploreRef.current = el; }}
        >
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            少し広げてみる
          </h2>
          <div className="space-y-3">
            {result.explore_cards.map((card) => (
              <CardItem key={card.id} card={card} onOpen={setOpenCard} />
            ))}
          </div>
        </section>

        {/* フッターリンク */}
        <div className="flex flex-col gap-3 pt-2">
          <Link
            href="/assessment"
            className="block w-full py-3.5 bg-violet-500 hover:bg-violet-600 text-white font-bold text-sm text-center rounded-2xl transition-colors"
          >
            もう一度やってみる
          </Link>
          <Link
            href="/"
            className="block w-full py-3.5 bg-white border border-gray-200 text-gray-600 font-medium text-sm text-center rounded-2xl hover:bg-gray-50 transition-colors"
          >
            トップに戻る
          </Link>
        </div>
      </div>

      {/* カードモーダル */}
      {openCard && (
        <CardModal card={openCard} onClose={() => setOpenCard(null)} />
      )}
    </>
  );
}
