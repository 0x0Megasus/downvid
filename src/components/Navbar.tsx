"use client";

import { cn } from "@/lib/utils";
import type { Mode } from "@/types";
import type { ReactNode } from "react";

interface NavbarProps {
  activeMode: Mode;
  onModeChange: (mode: Mode) => void;
}

const TABS: { id: Mode; label: string; icon: ReactNode }[] = [
  {
    id: "media",
    label: "Video/images",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
  {
    id: "music",
    label: "Music",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    id: "about",
    label: "About",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  },
  {
    id: "privacy",
    label: "Privacy",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
];

export function Navbar({ activeMode, onModeChange }: NavbarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 pt-1 pointer-events-none">
      <div className="max-w-lg mx-auto bg-zinc-900/95 backdrop-blur-xl border border-zinc-800/80 rounded-2xl shadow-2xl shadow-black/40 pointer-events-auto safe-area-bottom" role="tablist">
        <div className="flex py-1 px-1.5 gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeMode === tab.id}
              onClick={() => onModeChange(tab.id)}
              className={cn(
                "flex-1 flex flex-col items-center gap-0.5 py-2 rounded-xl transition-all duration-150 cursor-pointer",
                activeMode === tab.id
                  ? "text-red-500 bg-red-500/10"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50",
              )}
            >
              {tab.icon}
              <span className="text-[10px] font-medium tracking-wide uppercase">
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
