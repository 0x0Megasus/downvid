"use client";

import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
}

export function ProgressBar({ value, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn("w-full bg-zinc-800 rounded-[2px] h-[3px] overflow-hidden", className)}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          "relative h-full rounded-[2px] transition-all duration-300 ease-out overflow-hidden",
          clamped === 100 ? "bg-ok" : "bg-signal",
        )}
        style={{ width: `${clamped}%` }}
      >
        {clamped > 0 && clamped < 100 && (
          <span
            aria-hidden="true"
            className="animate-stripes absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(45deg, rgba(255,255,255,0.25) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.25) 75%, transparent 75%)",
              backgroundSize: "14px 14px",
            }}
          />
        )}
      </div>
    </div>
  );
}
