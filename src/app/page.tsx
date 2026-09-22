"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { MediaDownloader } from "@/components/MediaDownloader";
import { MusicSearch } from "@/components/MusicSearch";
import { Skeleton } from "@/components/ui/Skeleton";
import type { Mode } from "@/types";

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const modeParam = searchParams.get("mode");
  const mode: Mode = modeParam === "music" ? "music" : "media";

  const setMode = (m: Mode) => {
    if (m === mode) return;
    router.replace(`/?mode=${m}`, { scroll: false });
  };

  return (
    <>
      <main className="flex-1 flex items-center justify-center px-5 pb-24 pt-4">
        <div className="w-full max-w-lg mx-auto">
          <header className="mb-5 animate-rise">
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-signal animate-pulse-dot"
              />
              <p className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-zinc-400">
                Downvid
              </p>
            </div>
            <h1 className="mt-2 font-display text-[30px] sm:text-[38px] font-bold leading-[1.02] tracking-tight text-white text-balance">
              {mode === "media" ? "Download videos and photos" : "Find the song and download it"}
            </h1>
            <p className="mt-1 text-[13px] sm:text-sm text-zinc-500">
              {mode === "media"
                ? "Paste a link from YouTube, TikTok, Instagram and more. Free, no account."
                : "Just tell us the song or who sings it — tap your match and it's downloading."}
            </p>
          </header>

          <section
            aria-label={mode === "media" ? "Video downloader" : "Music search"}
            className="bg-panel border border-hairline rounded-sm p-4 sm:p-5 animate-rise"
            style={{ animationDelay: "90ms" }}
          >
            {mode === "media" && <MediaDownloader />}
            {mode === "music" && <MusicSearch />}
          </section>
        </div>
      </main>

      <Navbar activeMode={mode} onModeChange={setMode} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Downvid",
            url: "https://www.downvid.online",
            description:
              "Free no-login video and music downloader supporting YouTube, TikTok, Instagram, and more.",
            applicationCategory: "Multimedia",
            operatingSystem: "All",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            author: {
              "@type": "Organization",
              name: "Downvid",
            },
          }),
        }}
      />
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <main className="flex-1 flex items-center justify-center px-5 pb-24 pt-4">
          <div className="w-full max-w-lg mx-auto" aria-busy="true">
            <div className="flex items-center gap-2 mb-5">
              <Skeleton className="h-2 w-2 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-9 w-3/4 rounded-sm mb-2" />
            <Skeleton className="h-4 w-full rounded-sm mb-5" />
            <div className="bg-panel border border-hairline rounded-sm p-4 sm:p-5">
              <div className="flex gap-2">
                <Skeleton className="h-11 flex-1 rounded-sm" />
                <Skeleton className="h-11 w-[100px] rounded-sm" />
              </div>
            </div>
          </div>
        </main>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
