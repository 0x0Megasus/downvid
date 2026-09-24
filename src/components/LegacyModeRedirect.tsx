"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Backwards-compat island for old `/?mode=music` links.
 * Kept in its own Suspense boundary so the parent page stays static.
 */
function LegacyRedirectInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("mode") === "music") {
      router.replace("/music");
    }
  }, [searchParams, router]);

  return null;
}

export function LegacyModeRedirect() {
  return (
    <Suspense fallback={null}>
      <LegacyRedirectInner />
    </Suspense>
  );
}
