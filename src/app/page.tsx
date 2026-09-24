import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { MediaDownloader } from "@/components/MediaDownloader";
import { DownloaderPageShell } from "@/components/DownloaderPageShell";
import { LegacyModeRedirect } from "@/components/LegacyModeRedirect";

export const dynamic = "force-static";
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Download Videos & Photos",
  description:
    "Paste a link from YouTube, TikTok, Instagram and more. Free, no account.",
  openGraph: {
    title: "Downvid — Download Videos & Photos",
    description:
      "Paste a link from YouTube, TikTok, Instagram and more. Free, no account.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function MediaPage() {
  return (
    <>
      <LegacyModeRedirect />
      <DownloaderPageShell
        mode="media"
        title="Download videos, And photos."
        description="Paste a link from YouTube, TikTok, Instagram and more. Free, no account."
        panelLabel="Video downloader"
      >
        <MediaDownloader />
      </DownloaderPageShell>

      <Navbar activeMode="media" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Downvid",
            url: "https://downvid-delta.vercel.app",
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
