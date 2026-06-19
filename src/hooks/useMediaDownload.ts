"use client";

import { useState, useCallback } from "react";
import { submitDownload, getFileDownloadUrl } from "@/lib/api";
import { useProgress } from "./useProgress";

export function useMediaDownload() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const { progress, status, statusMessage, startPolling, reset } =
    useProgress();

  const handleDownload = useCallback(async () => {
    setError("");

    if (!url.trim()) {
      setError("Please enter a video URL");
      return;
    }

    try {
      const { id } = await submitDownload(url.trim());
      startPolling(id);

      const checkComplete = setInterval(() => {
        if (status === "complete") {
          clearInterval(checkComplete);
          const downloadUrl = getFileDownloadUrl(id);
          window.location.href = downloadUrl;
        }
      }, 200);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to start download",
      );
      reset();
    }
  }, [url, startPolling, reset, status]);

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
