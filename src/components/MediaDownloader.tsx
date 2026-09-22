"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { ProgressBar } from "./ui/ProgressBar";
import { submitDownload, getFileDownloadUrl } from "@/lib/api";
import { validateUrl } from "@/lib/validators";
import { useProgress } from "@/hooks/useProgress";

const PLATFORM_HINTS = [
  "YouTube",
  "TikTok",
  "Instagram",
  "Facebook",
  "Pinterest",
  "X",
];

export function MediaDownloader() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [downloadId, setDownloadId] = useState<string | null>(null);
  const [requesting, setRequesting] = useState(false);
  const { progress, status, statusMessage, startPolling, reset } =
    useProgress();
  const idRef = useRef<string | null>(null);

  const triggerBrowserDownload = useCallback((id: string) => {
    const a = document.createElement("a");
    a.href = getFileDownloadUrl(id);
    a.download = "";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }, []);

  useEffect(() => {
    if (status === "complete" && idRef.current) {
      const id = idRef.current;
      setDownloadId(id);
      setUrl("");
      triggerBrowserDownload(id);
    }
  }, [status, triggerBrowserDownload]);

  useEffect(() => {
    return () => {
      idRef.current = null;
    };
  }, []);

  const handleSubmit = useCallback(async () => {
    setError("");
    setDownloadId(null);
    const trimmed = url.trim();
    if (!trimmed) {
      setError("Paste a video link first.");
      return;
    }
    if (!validateUrl(trimmed)) {
      setError("That link is not supported yet. Try YouTube, TikTok or Instagram.");
      return;
    }

    // Show loading state immediately, before the server responds
    setRequesting(true);
    try {
      const { id } = await submitDownload(trimmed);
      idRef.current = id;
      startPolling(id);
    } catch (err) {
      idRef.current = null;
      setError(err instanceof Error ? err.message : "Could not reach the service.");
      reset();
    } finally {
      setRequesting(false);
    }
  }, [url, startPolling, reset]);

  const handleReset = useCallback(() => {
    idRef.current = null;
    setDownloadId(null);
    setError("");
    setRequesting(false);
    reset();
  }, [reset]);

  const isBusy =
    requesting ||
    status === "connecting" ||
    status === "downloading" ||
    status === "processing";
  const isEmpty = !url.trim();

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <label htmlFor="media-url" className="sr-only">
          Video link
        </label>
        <Input
          id="media-url"
          type="url"
          autoComplete="off"
          spellCheck={false}
          placeholder="Paste a link"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            if (error) setError("");
            if (status !== "idle") {
              idRef.current = null;
              setDownloadId(null);
              reset();
            }
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          error={error}
          disabled={isBusy}
          aria-label="Video link"
        />
        <Button
          onClick={handleSubmit}
          loading={isBusy}
          disabled={isEmpty || isBusy}
          className="shrink-0 min-w-[100px]"
        >
          Download
        </Button>
      </div>

      {isBusy && (
        <div className="animate-fadeIn rounded-sm border border-hairline bg-raise/60 px-3.5 py-3" aria-live="polite">
          <div className="flex items-center justify-between gap-3">
            <p className="flex min-w-0 items-center gap-2 text-[13px] text-zinc-200">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal animate-pulse-dot"
              />
              <span className="truncate">
                {requesting ? "Sending your link…" : statusMessage}
              </span>
            </p>
            <span className="shrink-0 font-mono text-[13px] text-zinc-400 tabular-nums">
              {progress}%
            </span>
          </div>
          <ProgressBar value={progress} className="mt-2.5" />
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center justify-between gap-3 rounded-sm border border-red-500/20 bg-red-500/[0.06] px-3.5 py-2.5">
          <p className="text-[13px] text-red-300">
            {statusMessage || "The transfer stopped. Check the link and retry."}
          </p>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            Retry
          </Button>
        </div>
      )}

      {status === "complete" && downloadId && (
        <p className="text-[13px] text-emerald-300 animate-fadeIn">
          Downloaded. Paste another link anytime.
        </p>
      )}

      {status === "idle" && !error && (
        <ul className="flex flex-wrap gap-1.5" aria-label="Supported platforms">
          {PLATFORM_HINTS.map((p) => (
            <li
              key={p}
              className="rounded-sm border border-hairline bg-raise/50 px-2 py-1 font-mono text-[11px] text-zinc-500"
            >
              {p}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
