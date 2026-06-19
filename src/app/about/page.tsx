import type { Metadata } from "next";
import { PLATFORMS } from "@/types";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Downvid - the free, no-login video and music downloader.",
  openGraph: {
    title: "About Downvid",
    description: "Free video and music downloader. No login required.",
  },
};

export default function AboutPage() {
  return (
    <main className="flex-1 flex items-center justify-center px-5 pb-20 pt-4">
      <div className="w-full max-w-lg mx-auto space-y-5">
        <h1 className="text-[28px] sm:text-[34px] font-bold text-center tracking-tight">
          <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
            About
          </span>
        </h1>

        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-5 text-sm">
          <section>
            <h2 className="text-[15px] font-semibold text-white mb-2">What is Downvid?</h2>
            <p className="text-zinc-400 leading-relaxed text-[13px]">
              Downvid is a free online tool that lets you download videos, images,
              and music from popular social media platforms. No account creation,
              no login, no tracking — just paste a URL and download.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-white mb-2">How It Works</h2>
            <ol className="list-decimal list-inside space-y-1 text-[13px] text-zinc-400">
              <li>Copy the URL of the video, image, or song</li>
              <li>Paste it into the input on the home page</li>
              <li>Click Download and wait for processing</li>
              <li>Your file downloads automatically</li>
            </ol>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-white mb-2.5">Supported Platforms</h2>
            <div className="flex flex-wrap gap-1.5">
              {PLATFORMS.map((p) => (
                <span key={p} className="px-2.5 py-1 bg-zinc-800 border border-zinc-700/50 rounded-md text-[12px] text-zinc-300">
                  {p}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-white mb-2">Why Downvid?</h2>
            <ul className="space-y-1 text-[13px] text-zinc-400">
              <li>&bull; Completely free</li>
              <li>&bull; No account or login required</li>
              <li>&bull; No ads or pop-ups</li>
              <li>&bull; Supports YouTube, TikTok, Instagram, Facebook, Pinterest, Twitter/X and more</li>
              <li>&bull; Works on desktop and mobile</li>
              <li>&bull; Private — we don&apos;t store your downloads</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
