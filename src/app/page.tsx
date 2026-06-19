"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { MediaDownloader } from "@/components/MediaDownloader";
import { MusicSearch } from "@/components/MusicSearch";
import { AboutSection } from "@/components/AboutSection";
import type { Mode } from "@/types";

function PrivacyContent() {
  return (
    <div className="text-[13px] text-zinc-400 leading-relaxed space-y-4">
      <section>
        <h2 className="text-[15px] font-semibold text-white mb-2">Information We Collect</h2>
        <p>Downvid does not collect, store, or share any personal information. No accounts, logins, or email addresses required. Submitted URLs are processed in real-time and not stored.</p>
      </section>
      <section>
        <h2 className="text-[15px] font-semibold text-white mb-2">How We Use Data</h2>
        <p>URLs are used solely to download requested media and deliver it to you. Once complete, all data is immediately discarded. No logging, tracking, or analysis of downloads.</p>
      </section>
      <section>
        <h2 className="text-[15px] font-semibold text-white mb-2">Cookies</h2>
        <p>Downvid does not use cookies for tracking or analytics. Minimal local storage is used only for client identification (a random UUID) to enable music search. No personal data is stored.</p>
      </section>
    </div>
  );
}

export default function HomePage() {
  const [mode, setMode] = useState<Mode>("media");

  return (
    <>
      <main className="flex-1 flex items-center justify-center px-5 pb-24 pt-4">
        <div className="w-full max-w-lg mx-auto">
          <div>
            <header className="text-center space-y-1 mb-5">
              <h1 className="text-[28px] sm:text-[34px] font-bold tracking-tight">
                <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
                  {mode === "privacy" ? "Privacy" : mode === "about" ? "About" : "Downvid"}
                </span>
              </h1>
              <p className="text-zinc-500 text-xs sm:text-sm">
                {mode === "media" && "Free Video & Image Downloader"}
                {mode === "music" && "Free Music Downloader"}
                {mode === "about" && "About Downvid & supported platforms."}
                {mode === "privacy" && "How we handle your data."}
              </p>
            </header>

            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 sm:p-5 shadow-sm">
              {mode === "media" && <MediaDownloader />}
              {mode === "music" && <MusicSearch />}
              {mode === "about" && <AboutSection />}
              {mode === "privacy" && <PrivacyContent />}
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
