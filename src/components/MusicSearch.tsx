"use client";

import { useEffect } from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { ProgressBar } from "./ui/ProgressBar";
import { Skeleton } from "./ui/Skeleton";
import { DownloadCat, type CatMood } from "./DownloadCat";
import { pushToast } from "@/lib/toast";
import { useMusicSearch } from "@/hooks/useMusicSearch";

const SYSTEM_BUTTON_LABELS = new Set([
  "next", "prev", "back", "cancel", "menu", "search", "more", "select",
]);

const SKELETON_ROWS = 5;

export function MusicSearch() {
  const {
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
  } = useMusicSearch();

  const isBusy =
    status === "connecting" ||
    status === "downloading" ||
    status === "processing";
  const isEmpty = !query.trim();

  useEffect(() => {
    if (error) pushToast(error);
  }, [error]);

  useEffect(() => {
    if (status === "error") {
      pushToast(statusMessage || "The transfer stopped.");
    }
  }, [status, statusMessage]);

  const mood: CatMood =
    status === "complete"
      ? "complete"
      : status === "error"
        ? "sad"
        : isBusy || isSearching || isDownloading
          ? "busy"
          : "idle";

  return (
    <div className="space-y-4">
      <div className="flex h-12 items-end justify-center">
        <DownloadCat mood={mood} />
      </div>
      <div className="flex gap-2">
        <label htmlFor="music-query" className="sr-only">
          Song or artist
        </label>
        <Input
          id="music-query"
          type="text"
          autoComplete="off"
          spellCheck={false}
          placeholder="Song or artist"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (status !== "idle") dismissResult();
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          invalid={!!error}
          disabled={isSearching || isBusy || isDownloading}
          aria-label="Song or artist"
        />
        <Button
          onClick={handleSearch}
          loading={isSearching}
          disabled={isEmpty || isSearching || isBusy || isDownloading}
          className="shrink-0 min-w-[100px]"
        >
          {isSearching ? "Finding" : "Find"}
        </Button>
      </div>

      {isSearching && (
        <div className="space-y-1.5" aria-busy="true" aria-label="Finding matches">
          {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
            <div
              key={i}
              className="rounded-sm border border-hairline bg-raise/40 px-3.5 py-2.5"
            >
              <Skeleton
                className="h-3.5 rounded"
                animated
              />
              <div className="mt-1.5 w-2/3">
                <Skeleton className="h-2.5 rounded" animated />
              </div>
            </div>
          ))}
        </div>
      )}

      {!isSearching && selectedSuggestion && (isDownloading || isBusy) && (
        <div
          className="animate-fadeIn rounded-sm border border-hairline bg-raise/60 px-3.5 py-3"
          aria-live="polite"
        >
          <p className="truncate text-[13px] text-zinc-200">
            {selectedSuggestion.title}
          </p>
          {isDownloading && !isBusy && (
            <div className="space-y-1.5" aria-busy="true" aria-label="Requesting download">
              <Skeleton className="h-3.5 w-3/4" />
              <Skeleton className="h-2.5 w-1/2" />
            </div>
          )}
          {isBusy && (
            <>
              <div className="mt-1.5 flex items-center justify-between gap-3">
                <p className="flex min-w-0 items-center gap-2 text-xs text-zinc-500">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal animate-pulse-dot"
                  />
                  <span className="truncate">{statusMessage}</span>
                </p>
                <span className="shrink-0 font-mono text-xs text-zinc-400 tabular-nums">
                  {progress}%
                </span>
              </div>
              <ProgressBar value={progress} className="mt-2.5" />
            </>
          )}
        </div>
      )}

      {status === "error" && selectedSuggestion && (
        <div className="flex items-center justify-between gap-3 rounded-sm border border-red-500/20 bg-red-500/[0.06] px-3.5 py-2.5 animate-fadeIn">
          <p className="text-[13px] text-red-300">
            {statusMessage || "The transfer stopped."}
          </p>
          <Button variant="ghost" size="sm" onClick={retryDownload}>
            Retry
          </Button>
        </div>
      )}

      {status === "complete" && downloadId && (
        <div className="animate-fadeIn rounded-sm border border-emerald-500/20 bg-emerald-500/[0.06] px-3.5 py-2.5">
          {completedTitle && (
            <p className="truncate text-[13px] text-zinc-200">
              {completedTitle}
            </p>
          )}
          <p className="mt-0.5 text-xs text-emerald-300">
            Downloaded. Type a song or singer above for fresh results.
          </p>
        </div>
      )}

      {!isSearching &&
        !isDownloading &&
        !isBusy &&
        status !== "complete" &&
        status !== "error" &&
        sessionId &&
        suggestions.length > 0 && (
          <ol className="stagger-children max-h-[40vh] space-y-1.5 overflow-y-auto scroll-smooth">
            {suggestions
              .filter(
                (s) =>
                  !SYSTEM_BUTTON_LABELS.has(s.label.toLowerCase().trim()) &&
                  s.label !== String(s.index),
              )
              .map((suggestion) => (
                <li key={suggestion.index}>
                  <button
                    onClick={() => handleSelect(suggestion)}
                    className="w-full cursor-pointer rounded-sm border border-hairline bg-raise/40 px-3.5 py-2.5 text-left transition-colors duration-150 hover:border-zinc-700 hover:bg-raise active:scale-[0.99]"
                  >
                    <span className="block truncate text-[13px] text-zinc-200">
                      {suggestion.title}
                    </span>
                    <span className="mt-0.5 block truncate text-[11px] text-zinc-500">
                      {suggestion.label}
                    </span>
                  </button>
                </li>
              ))}
          </ol>
        )}

      {!isSearching &&
        !isDownloading &&
        !isBusy &&
        status !== "complete" &&
        suggestions.length === 0 &&
        !error && (
          <p className="text-xs text-zinc-600">
            Name a track or an artist. No link needed.
          </p>
        )}
    </div>
  );
}
