import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Downvid privacy policy - how we handle your data.",
  openGraph: {
    title: "Privacy Policy | Downvid",
    description: "Downvid takes your privacy seriously.",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <main className="flex-1 flex items-center justify-center px-5 pb-24 pt-4">
      <div className="w-full max-w-lg mx-auto space-y-5">
        <h1 className="text-[28px] sm:text-[34px] font-bold text-center tracking-tight">
          <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
            Privacy
          </span>
        </h1>

        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-5 text-[13px] text-zinc-400 leading-relaxed">
          <section>
            <h2 className="text-[15px] font-semibold text-white mb-2">Information We Collect</h2>
            <p>
              Downvid does not collect, store, or share any personal
              information. No accounts, logins, or email addresses required.
              Submitted URLs are processed in real-time and not stored.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-white mb-2">How We Use Data</h2>
            <p>
              URLs are used solely to download requested media and deliver it to
              you. Once complete, all data is immediately discarded. No logging,
              tracking, or analysis of downloads.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-white mb-2">Cookies</h2>
            <p>
              Downvid does not use cookies for tracking or analytics. Minimal
              local storage is used only for client identification (a random
              UUID) to enable music search. No personal data is stored.
            </p>
          </section>

          <p className="text-[11px] text-zinc-600 pt-4 border-t border-zinc-800">
            Last updated: {new Date().toLocaleDateString("en-US", {
              year: "numeric", month: "long", day: "numeric",
            })}
          </p>
        </div>
        </div>
      </main>

      <Navbar />
    </>
  );
}
