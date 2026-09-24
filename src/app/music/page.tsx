import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { MusicSearch } from "@/components/MusicSearch";
import { DownloaderPageShell } from "@/components/DownloaderPageShell";

export const dynamic = "force-static";
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Find Songs & Download Music",
  description:
    "Just tell us the song or who sings it — tap your match and it's downloading.",
  openGraph: {
    title: "Downvid — Find Songs & Download Music",
    description:
      "Just tell us the song or who sings it — tap your match and it's downloading.",
  },
  alternates: {
    canonical: "/music",
  },
};

export default function MusicPage() {
  return (
    <>
      <DownloaderPageShell
        mode="music"
        title="Find the song, And download it."
        description="Just tell us the song or who sings it — tap your match and it's downloading."
        panelLabel="Music search"
      >
        <MusicSearch />
      </DownloaderPageShell>

      <Navbar activeMode="music" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Downvid Music",
            url: "https://downvid-delta.vercel.app/music",
            description:
              "Free no-login music downloader. Search by song or artist name.",
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
