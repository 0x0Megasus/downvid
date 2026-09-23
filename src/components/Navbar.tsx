"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { HomeSkeleton } from "@/components/HomeSkeleton";
import { AboutSkeleton } from "@/components/AboutSkeleton";
import { PrivacySkeleton } from "@/components/PrivacySkeleton";
import type { Mode } from "@/types";
import type { ReactNode } from "react";

interface NavbarProps {
  activeMode?: Mode;
  onModeChange?: (mode: Mode) => void;
}

/** Minimum time the skeleton stays visible so the shimmer reads. */
const SKELETON_MIN_MS = 450;

const TABS: { id: string; label: string; icon: ReactNode }[] = [
  {
    id: "media",
    label: "Video",
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

function PendingSkeleton({ id }: { id: string }) {
  if (id === "about") return <AboutSkeleton />;
  if (id === "privacy") return <PrivacySkeleton />;
  return <HomeSkeleton />;
}

export function Navbar({ activeMode, onModeChange }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, setPending] = useState<string | null>(null);
  const pendingSince = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = (id: string) => {
    if (id === "about") return pathname === "/about";
    if (id === "privacy") return pathname === "/privacy";
    return activeMode === id;
  };

  // Destination arrived: keep the skeleton for a beat so it reads,
  // then reveal the page.
  useEffect(() => {
    if (!pending) return;
    const elapsed = Date.now() - pendingSince.current;
    const wait = Math.max(0, SKELETON_MIN_MS - elapsed);
    timer.current = setTimeout(() => setPending(null), wait);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [pathname, activeMode, pending]);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const handleClick = (id: string) => {
    if (pending) return;
    if (isActive(id)) return;
    pendingSince.current = Date.now();
    setPending(id);
    if (id === "about") router.push("/about");
    else if (id === "privacy") router.push("/privacy");
    else if (pathname === "/") onModeChange?.(id as Mode);
    else router.push(`/?mode=${id}`);
  };

  return (
    <>
      {pending && (
        <div
          className="fixed inset-0 z-40 bg-base animate-fadeIn"
          aria-hidden="true"
        >
          <div className="flex items-center justify-center px-5 pb-24 pt-4 h-full overflow-hidden">
            <PendingSkeleton id={pending} />
          </div>
        </div>
      )}

      <nav
        aria-label="Primary"
        className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 pt-1 pointer-events-none"
      >
        <div className="max-w-lg mx-auto bg-panel/95 backdrop-blur-xl border border-hairline rounded-sm shadow-2xl shadow-black/40 pointer-events-auto safe-area-bottom" role="tablist">
          <div className="flex py-1 px-1.5 gap-1">
            {TABS.map((tab) => {
              const active = pending ? pending === tab.id : isActive(tab.id);
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive(tab.id)}
                  onClick={() => handleClick(tab.id)}
                  className={cn(
                    "flex-1 flex flex-col items-center gap-1 py-2 rounded-sm transition-colors duration-150 cursor-pointer active:scale-[0.97]",
                    active
                      ? "text-signal bg-signal/10"
                      : "text-zinc-500 hover:text-zinc-300 hover:bg-raise/60",
                  )}
                >
                  {tab.icon}
                  <span className="flex items-center gap-1 text-[13px] font-medium">
                    {tab.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-1 w-1 rounded-full transition-opacity",
                      active ? "bg-signal opacity-100" : "opacity-0",
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
