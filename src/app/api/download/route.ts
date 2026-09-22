import { NextResponse } from "next/server";

const API_BASE =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

const ID_PATTERN = /^[A-Za-z0-9_-]{4,128}$/;

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

async function fetchWithTimeout(
  url: string,
  init: RequestInit = {},
  timeoutMs = 20_000,
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(request: Request) {
  let body: { url?: unknown };
  try {
    body = await request.json();
  } catch {
    return badRequest("Invalid request body");
  }

  const url = typeof body.url === "string" ? body.url.trim() : "";
  if (!url || url.length > 2048) {
    return badRequest("A valid URL is required");
  }
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return badRequest("Unsupported URL protocol");
    }
  } catch {
    return badRequest("Invalid URL format");
  }

  try {
    const res = await fetchWithTimeout(
      `${API_BASE}/api/download`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      },
      30_000,
    );
    let data: unknown;
    try {
      data = await res.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid response from download service" },
        { status: 502 },
      );
    }
    if (!res.ok) {
      const msg =
        (data as { error?: string })?.error || "Failed to start download";
      return NextResponse.json({ error: msg }, { status: res.status });
    }
    const id = (data as { id?: unknown })?.id;
    if (typeof id !== "string" || !ID_PATTERN.test(id)) {
      return NextResponse.json(
        { error: "Invalid response from download service" },
        { status: 502 },
      );
    }
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return NextResponse.json(
        { error: "Download service timed out. Please try again." },
        { status: 504 },
      );
    }
    return NextResponse.json(
      { error: "Failed to connect to download service" },
      { status: 502 },
    );
  }
}
