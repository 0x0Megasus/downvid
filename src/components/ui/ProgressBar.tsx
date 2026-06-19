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
      className={cn("w-full bg-zinc-800 rounded-full h-1 overflow-hidden", className)}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          "h-full rounded-full transition-all duration-300 ease-out",
          clamped === 100 ? "bg-green-500" : "bg-red-500",
        )}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
