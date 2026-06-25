import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Suspense } from "react";
import { LoadingBar } from "@/components/LoadingBar";
import "./globals.css";

const APP_NAME = "Downvid - Free Video & Music Downloader";
const BASE_URL = "https://www.downvid.online";
const APP_DESCRIPTION =
  "Download videos, images, and music from YouTube, TikTok, Instagram, Facebook, and more. Free, no login required.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: APP_NAME,
    template: "%s | Downvid",
  },
  description: APP_DESCRIPTION,
  applicationName: "Downvid",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Downvid",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png" },
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
      },
    ],
  },
  formatDetection: {
    telephone: false,
  },
  keywords: [
    "video downloader",
    "music downloader",
    "YouTube downloader",
    "TikTok downloader",
    "Instagram downloader",
    "free downloader",
    "online video downloader",
    "Downvid",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.downvid.online",
    siteName: "Downvid",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Downvid - Free Video & Music Downloader",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: ["/android-chrome-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "4fd91eb4b9165f7c",
  },
  other: {
    "google-site-verification": "4fd91eb4b9165f7c",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${GeistSans.variable}`}>
      <body
        className="font-sans bg-black text-white antialiased min-h-dvh flex flex-col"
      >
        <Suspense fallback={null}>
          <LoadingBar />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
