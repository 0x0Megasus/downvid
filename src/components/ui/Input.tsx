"use client";

import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function Input({ className, error, id, ...props }: InputProps) {
  return (
    <div className="w-full">
      <input
        id={id}
        className={cn(
          "w-full px-3.5 py-2.5 bg-zinc-800 border rounded-lg text-white text-sm placeholder-zinc-500",
          "focus:outline-none focus:ring-1 focus:ring-red-500/50 focus:border-red-500/50",
          "transition-all duration-150",
          error ? "border-red-500/50" : "border-zinc-700 hover:border-zinc-600",
          className,
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
