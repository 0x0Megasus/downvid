"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 disabled:opacity-40 disabled:cursor-not-allowed select-none",
        variant === "primary" &&
          "bg-red-600 hover:bg-red-500 active:bg-red-700 text-white shadow-sm active:shadow-none active:translate-y-[0.5px]",
        variant === "secondary" &&
          "bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-900 text-zinc-100 border border-zinc-700",
        variant === "ghost" &&
          "bg-transparent hover:bg-zinc-800 active:bg-zinc-900 text-zinc-400 hover:text-white",
        size === "sm" && "px-3 py-1.5 text-xs gap-1.5",
        size === "md" && "px-4 py-2 text-sm gap-2",
        size === "lg" && "px-5 py-2.5 text-sm gap-2",
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
