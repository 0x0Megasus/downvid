export const POLL_INTERVAL_MS = 500;
export const POLL_TIMEOUT_MS = 60_000;
export const REQUEST_TIMEOUT_MS = 15_000;
export const MAX_RETRIES = 3;
export const RETRY_BASE_DELAY_MS = 1_000;

export const PHASE_MESSAGES: Record<string, string> = {
  connecting: "Connecting to server...",
  queued: "Queued... waiting in line",
  downloading: "Downloading media...",
  processing: "Processing your file...",
  uploading: "Almost there...",
  complete: "Done! Starting download...",
  error: "Download failed",
};
