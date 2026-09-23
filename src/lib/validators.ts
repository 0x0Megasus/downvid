const URL_PATTERNS = [
  /(?:youtube\.com|youtu\.be)/i,
  /tiktok\.com/i,
  /instagram\.com/i,
  /(?:facebook\.com|fb\.watch)/i,
  /pinterest\.\w+/i,
  /(?:twitter\.com|x\.com)/i,
  /reddit\.com/i,
  /vimeo\.com/i,
  /dailymotion\.com/i,
];

export type UrlCheck = "ok" | "invalid" | "unsupported";

export function checkUrl(url: string): UrlCheck {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return "invalid";
  }
  if (!["http:", "https:"].includes(parsed.protocol)) return "invalid";
  return URL_PATTERNS.some((p) => p.test(parsed.hostname))
    ? "ok"
    : "unsupported";
}

export function validateUrl(url: string): boolean {
  return checkUrl(url) === "ok";
}

export function getClientId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = localStorage.getItem("downvid_client_id");
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem("downvid_client_id", id);
    }
    return id;
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}
