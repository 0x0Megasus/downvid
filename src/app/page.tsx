"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { MediaDownloader } from "@/components/MediaDownloader";
import { MusicSearch } from "@/components/MusicSearch";
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
          <div>
            <header className="text-center space-y-1 mb-5">
              <h1 className="text-[18px] min-[400px]:text-[22px] sm:text-[34px] font-bold tracking-tight text-nowrap">
                <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
                  {mode === "media" ? "Downvid - Video & Image Downloader" : "Downvid - Music Downloader"}
                </span>
              </h1>
              <p className="text-zinc-500 text-xs sm:text-sm">
                {mode === "media"
                  ? "Download from any platform. Free & instant."
                  : "Search any song, download as audio."}
              </p>
            </header>

            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 sm:p-5 shadow-sm">
              {mode === "media" && <MediaDownloader />}
              {mode === "music" && <MusicSearch />}
            </div>
          </div>
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
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
