"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { ProgressBar } from "./ui/ProgressBar";
import { Spinner } from "./ui/Spinner";
import { submitDownload, getFileDownloadUrl } from "@/lib/api";
import { useProgress } from "@/hooks/useProgress";

export function MediaDownloader() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const { progress, status, statusMessage, startPolling, reset } = useProgress();
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const idRef = useRef<string | null>(null);

  const cleanupPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  useEffect(() => cleanupPolling, [cleanupPolling]);

  const handleSubmit = useCallback(async () => {
    setError("");
    if (!url.trim()) {
      setError("Paste a video URL");
      return;
    }

    try {
      const { id } = await submitDownload(url.trim());
      idRef.current = id;
      startPolling(id);

      pollingRef.current = setInterval(() => {
        const el = document.querySelector("[data-dl-status]");
        if (el?.getAttribute("data-dl-status") === "complete" && idRef.current) {
          cleanupPolling();
          window.location.href = getFileDownloadUrl(idRef.current);
        }
      }, 200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connection failed");
      reset();
    }
  }, [url, startPolling, reset, cleanupPolling]);

  const isBusy = status === "connecting" || status === "downloading" || status === "processing";
  const isEmpty = !url.trim();

  return (
    <div className="space-y-4" data-dl-status={status}>
      <div className="flex gap-2">
        <Input
          type="url"
          placeholder="Paste URL (YouTube, TikTok, Instagram...)"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            if (error) setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          error={error}
          disabled={isBusy}
        />
        <Button
          onClick={handleSubmit}
          loading={isBusy}
          disabled={isEmpty || isBusy || status === "complete"}
          className="shrink-0 min-w-[100px]"
        >
          {status === "complete" ? "Opening..." : "Download"}
        </Button>
      </div>

      {isBusy && (
        <div className="space-y-2.5 animate-fadeIn">
          <ProgressBar value={progress} />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Spinner size="sm" />
              <span className="text-xs text-zinc-500">{statusMessage}</span>
            </div>
            <span className="text-xs text-zinc-600 tabular-nums">{progress}%</span>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-red-400">Download failed. Try again.</span>
          <Button variant="ghost" size="sm" onClick={reset}>Retry</Button>
        </div>
      )}

      {status === "idle" && !error && (
        <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-600 flex-wrap">
          <span>YouTube</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span>TikTok</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span>Instagram</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span>Facebook</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span>Pinterest</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span>Twitter / X</span>
          <span className="text-zinc-500">& more</span>
        </div>
      )}
    </div>
  );
}
