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
  const [selectedSuggestion, setSelectedSuggestion] =
    useState<SuggestionItem | null>(null);
  const [sessionId, setSessionId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState("");
  const [downloadId, setDownloadId] = useState<string | null>(null);
  const [completedTitle, setCompletedTitle] = useState<string | null>(null);
  const {
    progress,
    status,
    statusMessage,
    startPolling,
    reset: resetProgress,
  } = useProgress();
  const downloadIdRef = useRef<string | null>(null);

  const triggerBrowserDownload = useCallback((id: string) => {
    const a = document.createElement("a");
    a.href = getFileDownloadUrl(id);
    a.download = "";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }, []);

  useEffect(() => {
    if (status === "complete" && downloadIdRef.current) {
      const id = downloadIdRef.current;
      downloadIdRef.current = null;
      setDownloadId(id);
      // Session is single-use: drop stale options + session so the user
      // must type a fresh query instead of tapping an expired list.
      setCompletedTitle(selectedSuggestion?.title ?? null);
      setQuery("");
      setSuggestions([]);
      setSessionId("");
      setSelectedSuggestion(null);
      triggerBrowserDownload(id);
    }
  }, [status, selectedSuggestion, triggerBrowserDownload]);

  const handleSearch = useCallback(async () => {
    setError("");
    setDownloadId(null);
    setCompletedTitle(null);
    downloadIdRef.current = null;
    resetProgress();
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
          index: Number.isNaN(Number(s.id)) ? s.id as unknown as number : Number(s.id),
          title: normalizeLabel(s.label) || s.label,
          label: s.label,
        })),
      );
      setSessionId(data.sessionId);
      setSelectedSuggestion(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setIsSearching(false);
    }
  }, [query, resetProgress]);

  const handleSelect = useCallback(
    async (option: SuggestionItem) => {
      // Guard: never send an empty/expired session to the API.
      // This skips the technical "sessionId and optionId are required"
      // error and forces a fresh search instead.
      if (!sessionId) {
        setSuggestions([]);
        setSelectedSuggestion(null);
        setCompletedTitle(null);
        setError("That list expired — type the song or singer again to get fresh results.");
        return;
      }
      setError("");
      setCompletedTitle(null);
      setDownloadId(null);
      setSelectedSuggestion(option);
      // Keep a copy so a failed download can be retried without re-search
      setIsDownloading(true);
      try {
        const { id } = await downloadMusic(sessionId, String(option.index));
        downloadIdRef.current = id;
        startPolling(id);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Download failed";
        if (/expired|not found|410|404|required/i.test(msg)) {
          // Session ended: wipe stale options so they can't be tapped again.
          setSuggestions([]);
          setSelectedSuggestion(null);
          setSessionId("");
          setCompletedTitle(null);
          setError("That list expired — type the song or singer again to get fresh results.");
        } else {
          // Keep selection so user can tap again to retry
          setError(msg);
          setSelectedSuggestion(option);
        }
      } finally {
        setIsDownloading(false);
      }
    },
    [sessionId, startPolling],
  );

  const retryDownload = useCallback(() => {
    // Retry only works while the session is still alive; otherwise the
    // guard in handleSelect will ask for a fresh search.
    if (selectedSuggestion) handleSelect(selectedSuggestion);
  }, [selectedSuggestion, handleSelect]);

  const dismissResult = useCallback(() => {
    // Typing a new query invalidates the old session list immediately.
    downloadIdRef.current = null;
    setDownloadId(null);
    setSelectedSuggestion(null);
    setSuggestions([]);
    setSessionId("");
    setCompletedTitle(null);
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
    downloadId,
    completedTitle,
    sessionId,
    handleSearch,
    handleSelect,
    retryDownload,
    dismissResult,
  };
}
