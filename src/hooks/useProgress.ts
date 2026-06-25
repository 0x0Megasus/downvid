"use client";

import { useCallback, useRef, useState } from "react";
import { getProgress } from "@/lib/api";
import {
  POLL_INTERVAL_MS,
  POLL_TIMEOUT_MS,
  MAX_RETRIES,
} from "@/lib/constants";
import type { DownloadStatus } from "@/types";

export function useProgress() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<DownloadStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const retryCountRef = useRef(0);

  const startPolling = useCallback((id: string) => {
    setStatus("connecting");
    setProgress(0);
    setStatusMessage("Connecting to server...");
    retryCountRef.current = 0;

    const timeout = setTimeout(() => {
      stopPolling();
      setStatus("error");
      setStatusMessage("Request timed out. Please try again.");
    }, POLL_TIMEOUT_MS);
    timeoutRef.current = timeout;

    const interval = setInterval(async () => {
      try {
        const data = await getProgress(id);
        // Reset retry count on success
        retryCountRef.current = 0;
        const p = data.progress;

        if (p === -1) {
          stopPolling();
          setStatus("error");
          setStatusMessage(data.error || "Download failed. The link may be invalid.");
          return;
        }

        setProgress(p);

        if (p < 10) {
          setStatus("connecting");
          setStatusMessage("Connecting to server...");
        } else if (p < 40) {
          setStatus("downloading");
          setStatusMessage("Downloading media...");
        } else if (p < 90) {
          setStatus("processing");
          setStatusMessage("Processing your file...");
        } else if (p < 100) {
          setStatus("processing");
          setStatusMessage("Almost there...");
        } else {
          stopPolling();
          setStatus("complete");
          setStatusMessage("Done! Starting download...");
        }
      } catch {
        retryCountRef.current += 1;

        if (retryCountRef.current >= MAX_RETRIES) {
          stopPolling();
          setStatus("error");
          setStatusMessage("Connection lost. Please try again.");
          return;
        }

        // Exponential backoff: skip this poll cycle, retry on next
        setStatusMessage(
          `Reconnecting... (attempt ${retryCountRef.current}/${MAX_RETRIES})`,
        );
      }
    }, POLL_INTERVAL_MS);
    intervalRef.current = interval;
  }, []);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    stopPolling();
    setProgress(0);
    setStatus("idle");
    setStatusMessage("");
    retryCountRef.current = 0;
  }, [stopPolling]);

  return { progress, status, statusMessage, startPolling, stopPolling, reset };
}
