"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { submitDownload, getFileDownloadUrl } from "@/lib/api";
import { useProgress } from "./useProgress";

export function useMediaDownload() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const { progress, status, statusMessage, startPolling, reset } =
    useProgress();
  const downloadIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (status === "complete" && downloadIdRef.current) {
      const id = downloadIdRef.current;
      downloadIdRef.current = null;
      window.location.href = getFileDownloadUrl(id);
    }
  }, [status]);

  const handleDownload = useCallback(async () => {
    setError("");

    if (!url.trim()) {
      setError("Please enter a video URL");
      return;
    }

    try {
      const { id } = await submitDownload(url.trim());
      downloadIdRef.current = id;
      startPolling(id);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to start download",
      );
      reset();
    }
  }, [url, startPolling, reset]);

  return {
    url,
    setUrl,
    error,
    setError,
    progress,
    status,
    statusMessage,
    handleDownload,
    reset,
  };
}
