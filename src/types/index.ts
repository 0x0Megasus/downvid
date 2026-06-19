export interface DownloadResponse {
  id: string;
}

export interface ProgressResponse {
  progress: number;
  error?: string;
}

export interface FileInfo {
  exists: boolean;
  platform?: string;
  size?: number;
}

export interface MusicOption {
  id: string;
  label: string;
}

export interface MusicSearchResponse {
  sessionId: string;
  query: string;
  suggestions: MusicOption[];
}

export interface MusicDownloadResponse {
  id: string;
}

export type DownloadStatus =
  | "idle"
  | "connecting"
  | "downloading"
  | "processing"
  | "complete"
  | "error";

export type Mode = "media" | "music" | "about" | "privacy";

export const PLATFORMS = [
  "YouTube",
  "TikTok",
  "Instagram",
  "Facebook",
  "Pinterest",
  "Twitter / X",
] as const;

export const URL_PATTERNS = [
  { label: "YouTube", pattern: /(?:youtube\.com|youtu\.be)/i },
  { label: "TikTok", pattern: /tiktok\.com/i },
  { label: "Instagram", pattern: /instagram\.com/i },
  { label: "Facebook", pattern: /(?:facebook\.com|fb\.watch)/i },
  { label: "Pinterest", pattern: /pinterest\.\w+/i },
  { label: "Twitter / X", pattern: /(?:twitter\.com|x\.com)/i },
  { label: "Reddit", pattern: /reddit\.com/i },
  { label: "Vimeo", pattern: /vimeo\.com/i },
  { label: "Dailymotion", pattern: /dailymotion\.com/i },
] as const;
