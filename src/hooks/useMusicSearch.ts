"use client";

import { useState, useCallback } from "react";
import { searchMusic, downloadMusic, getFileDownloadUrl } from "@/lib/api";
import { getClientId } from "@/lib/validators";
import { useProgress } from "./useProgress";
import type { MusicOption } from "@/types";

export function useMusicSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<MusicOption[]>([]);
  const [sessionId, setSessionId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");
  const { progress, status, statusMessage, startPolling, reset: resetProgress } = useProgress();

  const handleSearch = useCallback(async () => {
    setError("");
    if (!query.trim()) {
      setError("Please enter a song name");
      return;
    }

    setIsSearching(true);
    try {
      const clientId = getClientId();
      const data = await searchMusic(query.trim(), clientId);
      setSuggestions(data.options);
      setSessionId(data.sessionId);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Search failed",
      );
    } finally {
      setIsSearching(false);
    }
  }, [query]);

  const handleSelect = useCallback(
    async (optionIndex: number) => {
      setError("");
      try {
        const { id } = await downloadMusic(sessionId, optionIndex);
        startPolling(id);

        const checkComplete = setInterval(() => {
          if (status === "complete") {
            clearInterval(checkComplete);
            window.location.href = getFileDownloadUrl(id);
          }
        }, 200);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Download failed",
        );
      }
    },
    [sessionId, startPolling, status],
  );

  const reset = useCallback(() => {
    setQuery("");
    setSuggestions([]);
    setSessionId("");
    setError("");
    resetProgress();
  }, [resetProgress]);

  return {
    query,
    setQuery,
    suggestions,
    isSearching,
    error,
    progress,
    status,
    statusMessage,
    handleSearch,
    handleSelect,
    reset,
  };
}
