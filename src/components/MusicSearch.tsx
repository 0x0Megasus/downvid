"use client";

import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { ProgressBar } from "./ui/ProgressBar";
import { Spinner } from "./ui/Spinner";
import { useMusicSearch } from "@/hooks/useMusicSearch";

const SYSTEM_BUTTON_LABELS = new Set([
  "next", "prev", "back", "cancel", "menu", "search", "more", "select",
]);

export function MusicSearch() {
  const {
    query, setQuery, suggestions, selectedSuggestion, isSearching, isDownloading, error,
    progress, status, statusMessage, handleSearch, handleSelect,
  } = useMusicSearch();

  const isBusy = status === "connecting" || status === "downloading" || status === "processing";
  const isEmpty = !query.trim();

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Song or artist name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          error={error}
          disabled={isSearching || isBusy || isDownloading}
        />
        <Button
          onClick={handleSearch}
          loading={isSearching}
          disabled={isEmpty || isSearching || isBusy || isDownloading}
          className="shrink-0 min-w-[100px]"
        >
          {isSearching ? "Searching" : "Search"}
        </Button>
      </div>

      {selectedSuggestion && (isDownloading || isBusy) && (
        <div className="space-y-2.5 animate-fadeIn">
          <div className="px-3.5 py-2.5 bg-zinc-800/40 border border-zinc-800 rounded-lg">
            <div className="text-sm text-zinc-200 truncate">{selectedSuggestion.title}</div>
            <div className="text-[11px] text-zinc-500 mt-0.5 truncate">
              {selectedSuggestion.label}
            </div>
          </div>
          {isDownloading && (
            <div className="flex items-center gap-2">
              <Spinner size="sm" />
              <span className="text-xs text-zinc-500">Requesting download...</span>
            </div>
          )}
          {isBusy && (
            <>
              <ProgressBar value={progress} />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Spinner size="sm" />
                  <span className="text-xs text-zinc-500">{statusMessage}</span>
                </div>
                {progress > 0 && (
                  <span className="text-xs text-zinc-600 tabular-nums">{progress}%</span>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {!isDownloading && !isBusy && suggestions.length > 0 && (
        <div className="max-h-[40vh] overflow-y-auto scroll-smooth space-y-1.5 animate-fadeIn">
          {suggestions
            .filter(
              (s) =>
                !SYSTEM_BUTTON_LABELS.has(s.label.toLowerCase().trim()) &&
                s.label !== String(s.index),
            )
            .map((suggestion) => (
              <button
                key={suggestion.index}
                onClick={() => handleSelect(suggestion)}
                className="w-full text-left px-3.5 py-2.5 bg-zinc-800/40 hover:bg-zinc-700/40 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-all duration-150 group cursor-pointer"
              >
                <div className="text-sm text-zinc-200 group-hover:text-white truncate">
                  {suggestion.title}
                </div>
                <div className="text-[11px] text-zinc-500 mt-0.5 truncate">
                  {suggestion.label}
                </div>
              </button>
            ))}
        </div>
      )}

      {!isSearching && !isDownloading && !isBusy && suggestions.length === 0 && !error && (
        <p className="text-xs text-zinc-600 text-center">
          Search by song or artist name. No URL needed.
        </p>
      )}
    </div>
  );
}
