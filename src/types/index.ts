export interface DownloadResponse {
  id: string;
}

export interface ProgressResponse {
  progress: number;
  error?: string;
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

export type Mode = "media" | "music";

export const PLATFORMS = [
  "YouTube",
  "TikTok",
  "Instagram",
  "Facebook",
  "Pinterest",
  "Twitter / X",
] as const;
