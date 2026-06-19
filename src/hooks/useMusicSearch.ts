"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { searchMusic, downloadMusic, getFileDownloadUrl } from "@/lib/api";
import { getClientId } from "@/lib/validators";
import { useProgress } from "./useProgress";

interface SuggestionItem {
  index: number;
  title: string;
  label: string;
}

const normalizeLabel = (label: string) => {
  return label
    .replace(/^\d+[\.\)-]\s*/, "")
    .replace(/[@#]\w+/g, "")
    .trim();
};

export function useMusicSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<SuggestionItem | null>(null);
  const [sessionId, setSessionId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState("");
  const { progress, status, statusMessage, startPolling, reset: resetProgress } = useProgress();
  const downloadIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (status === "complete" && downloadIdRef.current) {
      const id = downloadIdRef.current;
      downloadIdRef.current = null;
      window.location.href = getFileDownloadUrl(id);
    }
  }, [status]);

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
      setSuggestions(
        data.suggestions.map((s) => ({
          index: Number(s.id),
          title: normalizeLabel(s.label),
          label: s.label,
        })),
      );
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
    async (option: SuggestionItem) => {
      setError("");
      setSelectedSuggestion(option);
      setSuggestions([]);
      setIsDownloading(true);
      try {
        const { id } = await downloadMusic(sessionId, String(option.index));
        downloadIdRef.current = id;
        startPolling(id);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Download failed";
        if (/expired|not found|410|404/i.test(msg)) {
          setSuggestions([]);
          setSelectedSuggestion(null);
          setSessionId("");
          setError("Session expired — please search again.");
        } else {
          setError(msg);
        }
      } finally {
        setIsDownloading(false);
      }
    },
    [sessionId, startPolling],
  );

  const reset = useCallback(() => {
    setQuery("");
    setSuggestions([]);
    setSelectedSuggestion(null);
    setSessionId("");
    setIsDownloading(false);
    setError("");
    resetProgress();
  }, [resetProgress]);

  return {
    query,
    setQuery,
    suggestions,
    selectedSuggestion,
    isSearching,
    isDownloading,
    error,
    progress,
    status,
    statusMessage,
    handleSearch,
    handleSelect,
    reset,
  };
}
