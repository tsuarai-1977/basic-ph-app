import { ChannelCode } from "@/lib/mvp-types";
import { CHANNEL_INFO } from "@/lib/mvp-channels";

interface Props {
  code: ChannelCode;
  size?: "sm" | "md";
}

/**
 * チャンネルコード左に色付き小丸（chip）を表示するコンポーネント
 */
export default function ChannelChip({ code, size = "md" }: Props) {
  const info = CHANNEL_INFO[code];
  const dotSize = size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3";
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  return (
    <span className={`inline-flex items-center gap-1.5 ${textSize}`}>
      <span
        className={`${dotSize} rounded-full shrink-0`}
        style={{ backgroundColor: info.color }}
      />
      <span className="font-medium text-gray-700">
        {code}｜{info.label}
      </span>
    </span>
  );
}
