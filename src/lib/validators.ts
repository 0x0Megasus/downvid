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

export function validateUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) return false;
    return URL_PATTERNS.some((p) => p.test(parsed.hostname));
  } catch {
    return false;
  }
}

export function getClientId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("downvid_client_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("downvid_client_id", id);
  }
  return id;
}
