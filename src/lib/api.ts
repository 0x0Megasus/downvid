import type {
  DownloadResponse,
  ProgressResponse,
  MusicSearchResponse,
  MusicDownloadResponse,
  FileInfo,
} from "@/types";
import { REQUEST_TIMEOUT_MS } from "@/lib/constants";

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
  timeoutMs: number = REQUEST_TIMEOUT_MS,
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(path, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    clearTimeout(timer);

    if (!res.ok) {
      const text = await res.text().catch(() => "Unknown error");
      let message = text;
      try {
        const parsed = JSON.parse(text);
        if (parsed.error) message = parsed.error;
      } catch {}
      throw new ApiError(message, res.status);
    }
    return res.json() as Promise<T>;
  } catch (err) {
    clearTimeout(timer);
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new ApiError("Request timed out", 408);
    }
    throw err;
  }
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
  optionId: string,
): Promise<MusicDownloadResponse> {
  return request<MusicDownloadResponse>("/api/music/download", {
    method: "POST",
    body: JSON.stringify({ sessionId, optionId }),
  });
}

export function getFileDownloadUrl(id: string): string {
  return `/api/file/${id}`;
}
