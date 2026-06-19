import { API_BASE } from "./constants";
import type {
  DownloadResponse,
  ProgressResponse,
  MusicSearchResponse,
  MusicDownloadResponse,
  FileInfo,
} from "@/types";

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "Unknown error");
    throw new ApiError(text, res.status);
  }
  return res.json() as Promise<T>;
}

export async function submitDownload(url: string): Promise<DownloadResponse> {
  return request<DownloadResponse>("/api/download", {
    method: "POST",
    body: JSON.stringify({ url }),
  });
}

export async function getProgress(id: string): Promise<ProgressResponse> {
  return request<ProgressResponse>(`/api/progress/${id}`);
}

export async function getFileInfo(id: string): Promise<FileInfo> {
  return request<FileInfo>(`/api/info/${id}`);
}

export async function searchMusic(
  query: string,
  clientId: string,
): Promise<MusicSearchResponse> {
  return request<MusicSearchResponse>("/api/music/search", {
    method: "POST",
    headers: { "x-client-id": clientId },
    body: JSON.stringify({ query }),
  });
}

export async function downloadMusic(
  sessionId: string,
  optionIndex: number,
): Promise<MusicDownloadResponse> {
  return request<MusicDownloadResponse>("/api/music/download", {
    method: "POST",
    body: JSON.stringify({ sessionId, optionId: optionIndex }),
  });
}

export function getFileDownloadUrl(id: string): string {
  return `${API_BASE}/api/file/${id}`;
}
