"use client";

import { cn } from "@/lib/utils";

export type CatMood = "idle" | "busy" | "complete" | "sad";

const LABELS: Record<CatMood, string> = {
  idle: "A cat naps beside the downloader",
  busy: "A cat kneads its paws while the download runs",
  complete: "A cat celebrates a finished download",
  sad: "A cat looks sorry the download failed",
};

/**
 * Tiny resident of the download panel. Pure inline SVG + CSS,
 * respects prefers-reduced-motion via the global kill-switch.
 */
export function DownloadCat({ mood }: { mood: CatMood }) {
  return (
    <div
      role="img"
      aria-label={LABELS[mood]}
      className={cn(
        "relative h-12 w-14 select-none",
        mood === "idle" && "animate-cat-breathe",
        mood === "complete" && "animate-cat-hop",
      )}
    >
      {mood === "idle" && (
        <span aria-hidden="true" className="absolute right-1 top-0 flex gap-0.5">
          <span
            className="animate-z-float font-mono text-[10px] font-semibold text-zinc-500"
            style={{ animationDelay: "0s" }}
          >
            z
          </span>
          <span
            className="animate-z-float font-mono text-[12px] font-semibold text-zinc-500"
            style={{ animationDelay: "0.8s" }}
          >
            z
          </span>
          <span
            className="animate-z-float font-mono text-[14px] font-semibold text-zinc-500"
            style={{ animationDelay: "1.6s" }}
          >
            z
          </span>
        </span>
      )}

      <svg viewBox="0 0 64 56" className="h-full w-full" aria-hidden="true">
        {/* tail */}
        <path
          d="M10 44 C 4 42, 3 34, 8 30 C 11 27.5, 15 28, 16 31"
          fill="none"
          stroke="#e2d2b8"
          strokeWidth="5"
          strokeLinecap="round"
          className={mood === "busy" ? "animate-cat-tail" : undefined}
        />

        {/* body loaf */}
        <ellipse cx="34" cy="42" rx="20" ry="12" fill="#f3e9d7" />
        <ellipse cx="34" cy="44.5" rx="13" ry="7.5" fill="#e9d9bd" />

        {/* ears */}
        <path d="M20 22 L17 8 L28 15 Z" fill="#f3e9d7" />
        <path d="M48 22 L51 8 L40 15 Z" fill="#f3e9d7" />
        <path d="M21 18 L19.5 11.5 L25.5 15.5 Z" fill="#ff9aa2" />
        <path d="M47 18 L48.5 11.5 L42.5 15.5 Z" fill="#ff9aa2" />

        {/* head */}
        <circle cx="34" cy="26" r="15" fill="#f3e9d7" />

        {/* stripes */}
        <path d="M29 12.5 L29 17 M34 12 L34 17 M39 12.5 L39 17" stroke="#e2d2b8" strokeWidth="1.6" strokeLinecap="round" />

        {/* eyes */}
        {mood === "idle" && (
          <g stroke="#26262b" strokeWidth="1.6" strokeLinecap="round" fill="none">
            <path d="M25 26 q 2.5 2 5 0" />
            <path d="M38 26 q 2.5 2 5 0" />
          </g>
        )}
        {(mood === "busy" || mood === "sad") && (
          <g fill="#26262b">
            <circle cx="27.5" cy="26" r="2" />
            <circle cx="40.5" cy="26" r="2" />
            <circle cx="28.2" cy="25.3" r="0.7" fill="#fff" />
            <circle cx="41.2" cy="25.3" r="0.7" fill="#fff" />
          </g>
        )}
        {mood === "complete" && (
          <g stroke="#26262b" strokeWidth="1.6" strokeLinecap="round" fill="none">
            <path d="M25 27 L27.5 24.5 L30 27" />
            <path d="M38 27 L40.5 24.5 L43 27" />
          </g>
        )}
        {mood === "sad" && (
          <path
            d="M44.5 29 q 1 3 -0.5 4.5"
            stroke="#7dd3fc"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* blush */}
        {(mood === "busy" || mood === "complete") && (
          <g fill="#ff9aa2" opacity="0.7">
            <ellipse cx="23" cy="30" rx="2.4" ry="1.5" />
            <ellipse cx="45" cy="30" rx="2.4" ry="1.5" />
          </g>
        )}

        {/* mouth */}
        {mood === "complete" ? (
          <path
            d="M31 32 q 3 3.5 6 0"
            stroke="#26262b"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
        ) : (
          <path
            d="M32.5 31.5 q 0 1.5 -1.8 1.5 M35.5 31.5 q 0 1.5 1.8 1.5"
            stroke="#26262b"
            strokeWidth="1.3"
            strokeLinecap="round"
            fill="none"
            transform="translate(-0.5 0)"
          />
        )}

        {/* front paws */}
        <ellipse
          cx="27"
          cy="49"
          rx="4"
          ry="3"
          fill="#f3e9d7"
          stroke="#e2d2b8"
          strokeWidth="1"
          className={mood === "busy" ? "animate-cat-knead-left" : undefined}
        />
        <ellipse
          cx="41"
          cy="49"
          rx="4"
          ry="3"
          fill="#f3e9d7"
          stroke="#e2d2b8"
          strokeWidth="1"
          className={mood === "busy" ? "animate-cat-knead-right" : undefined}
        />
      </svg>
    </div>
  );
}
