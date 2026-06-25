"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const DURATION_MS = 650;

/**
 * Natural easing curve for progress:
 *  - 0-30%   fast (feels responsive)
 *  - 30-80%  slow crawl (feels like work)
 *  - 80-100% fast finish
 */
function easeProgress(t: number): number {
  if (t < 0.08) return (t / 0.08) * 0.3;          // 0%  → 30%  in first 8%
  if (t < 0.75) return 0.3 + ((t - 0.08) / 0.67) * 0.5; // 30% → 80%  in next 67%
  return 0.8 + ((t - 0.75) / 0.25) * 0.2;          // 80% → 100% in last 25%
}

export function LoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const frameRef = useRef<number>(0);
  const startRef = useRef(0);

  // Track the current "identity" of the route for re-click detection
  const identityRef = useRef("");

  const animate = useCallback(() => {
    const elapsed = Date.now() - startRef.current;
    const t = Math.min(elapsed / DURATION_MS, 1);
    const p = easeProgress(t);

    setProgress(Math.min(p * 100, 99.9));

    if (t < 1) {
      frameRef.current = requestAnimationFrame(animate);
    } else {
      setProgress(100);
      // Brief hold at 100%, then hide
      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 200);
    }
  }, []);

  const trigger = useCallback(() => {
    // Cancel any in-flight animation
    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    // Reset
    setProgress(0);
    setVisible(true);
    startRef.current = Date.now();
    frameRef.current = requestAnimationFrame(animate);
  }, [animate]);

  // Build identity from pathname + mode param
  const currentMode = searchParams.get("mode") || "";
  const currentIdentity = currentMode
    ? `${pathname}?mode=${currentMode}`
    : pathname;

  useEffect(() => {
    if (currentIdentity !== identityRef.current) {
      identityRef.current = currentIdentity;
      trigger();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, currentMode]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px] bg-zinc-800">
      <div
        className="h-full bg-red-500 transition-[width] duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
