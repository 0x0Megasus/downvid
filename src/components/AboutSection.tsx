import { PLATFORMS } from "@/types";

export function AboutSection() {
  return (
    <div className="space-y-5 text-sm">
      <section>
        <h2 className="text-[15px] font-semibold text-white mb-2">Why Downvid?</h2>
        <p className="text-zinc-400 leading-relaxed text-[13px]">
          Free, no-login video and music downloader. Paste a URL or search a song,
          download instantly. No ads, no tracking, no account.
        </p>
      </section>

      <section>
        <h2 className="text-[15px] font-semibold text-white mb-2.5">Supported Platforms</h2>
        <div className="flex flex-wrap gap-1.5">
          {PLATFORMS.map((p) => (
            <span key={p} className="px-2.5 py-1 bg-zinc-800 border border-zinc-700/50 rounded-md text-[12px] text-zinc-300">
              {p}
            </span>
          ))}
          <span className="px-2.5 py-1 bg-zinc-800/50 border border-zinc-700/30 rounded-md text-[12px] text-zinc-500">
            & more
          </span>
        </div>
      </section>

      <section>
        <h2 className="text-[15px] font-semibold text-white mb-2.5">FAQ</h2>
        <div className="space-y-1">
          {[
            { q: "Is Downvid free?", a: "Yes, completely. No premium tiers." },
            { q: "Do I need an account?", a: "No. Paste a URL or search and download. No sign-up." },
            { q: "Which platforms?", a: "YouTube, TikTok, Instagram, Facebook, Pinterest, Twitter/X and more." },
          ].map((faq) => (
            <details key={faq.q} className="group">
              <summary className="cursor-pointer text-[13px] text-zinc-400 hover:text-zinc-200 transition-colors py-2 px-3 bg-zinc-800/20 rounded-lg [&::-webkit-details-marker]:hidden flex items-center gap-2">
                <svg className="w-3 h-3 text-zinc-600 group-open:rotate-90 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {faq.q}
              </summary>
              <p className="text-[12px] text-zinc-500 mt-1 px-3 pb-1">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
