"use client";

import { useEffect, useState } from "react";
import {
  subscribeToast,
  dismissToast,
  type ToastItem,
} from "@/lib/toast";

/**
 * Error toasts floating above the dock. Sharp 2px panel, signal edge,
 * auto-dismiss with a manual close. role="alert" for assistive tech.
 */
export function Toaster() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => subscribeToast(setItems), []);

  if (items.length === 0) return null;

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex flex-col items-center gap-2 px-5"
    >
      {items.map((toast) => (
        <div
          key={toast.id}
          role="alert"
          className="animate-fadeIn pointer-events-auto flex w-full max-w-lg items-start gap-2.5 rounded-sm border border-hairline border-l-2 border-l-signal bg-panel/95 py-2.5 pl-3 pr-2 shadow-2xl shadow-black/50 backdrop-blur-xl"
        >
          <span
            aria-hidden="true"
            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal"
          />
          <p className="min-w-0 flex-1 text-[13px] leading-snug text-zinc-200">
            {toast.message}
          </p>
          <button
            onClick={() => dismissToast(toast.id)}
            aria-label="Dismiss"
            className="shrink-0 cursor-pointer rounded-sm px-1.5 py-0.5 font-mono text-xs text-zinc-500 transition-colors hover:bg-raise hover:text-zinc-200"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
