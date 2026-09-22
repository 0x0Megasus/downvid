"use client";

import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function Input({ className, error, id, ...props }: InputProps) {
  return (
    <div className="relative w-full">
      <input
        id={id}
        className={cn(
          "w-full px-3.5 py-2.5 bg-raise border border-hairline rounded-sm text-white text-sm placeholder-zinc-600",
          "outline-none focus:outline-none focus:border-zinc-500 focus:ring-0",
          "transition-colors duration-150",
          error ? "border-red-500/60" : "hover:border-zinc-700",
          className,
        )}
        {...props}
      />
      {error && <p className="absolute top-full mt-1 left-0 text-xs text-red-400 pointer-events-none">{error}</p>}
    </div>
  );
}
