"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getProgress } from "@/lib/api";
import {
  POLL_INTERVAL_MS,
  POLL_TIMEOUT_MS,
  MAX_RETRIES,
  PHASE_MESSAGES,
} from "@/lib/constants";
import type { DownloadStatus } from "@/types";

export function useProgress() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<DownloadStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const retryCountRef = useRef(0);

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

  // Cleanup on unmount to avoid leaked intervals
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      intervalRef.current = null;
      timeoutRef.current = null;
    };
  }, []);

  const startPolling = useCallback(
    (id: string) => {
      // Stop any previous session before starting a new one
      stopPolling();
      setStatus("connecting");
      setProgress(0);
      setStatusMessage(PHASE_MESSAGES.connecting);
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
            setStatusMessage(
              data.error || "Download failed. The link may be invalid.",
            );
            return;
          }

          setProgress(p);

          if (p < 10) {
            setStatus("connecting");
            setStatusMessage(PHASE_MESSAGES.connecting);
          } else if (p < 40) {
            setStatus("downloading");
            setStatusMessage(PHASE_MESSAGES.downloading);
          } else if (p < 90) {
            setStatus("processing");
            setStatusMessage(PHASE_MESSAGES.processing);
          } else if (p < 100) {
            setStatus("processing");
            setStatusMessage(PHASE_MESSAGES.uploading);
          } else {
            stopPolling();
            setStatus("complete");
            setStatusMessage(PHASE_MESSAGES.complete);
          }
        } catch {
          retryCountRef.current += 1;

          if (retryCountRef.current >= MAX_RETRIES) {
            stopPolling();
            setStatus("error");
            setStatusMessage("Connection lost. Please try again.");
            return;
          }

          // Skip this poll cycle, retry on next tick
          setStatusMessage(
            `Reconnecting... (attempt ${retryCountRef.current}/${MAX_RETRIES})`,
          );
        }
      }, POLL_INTERVAL_MS);
      intervalRef.current = interval;
    },
    [stopPolling],
  );

  const reset = useCallback(() => {
    stopPolling();
    setProgress(0);
    setStatus("idle");
    setStatusMessage("");
    retryCountRef.current = 0;
  }, [stopPolling]);

  return { progress, status, statusMessage, startPolling, stopPolling, reset };
}
