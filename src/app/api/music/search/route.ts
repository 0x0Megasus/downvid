import { NextResponse } from "next/server";

const API_BASE =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export async function POST(request: Request) {
  let body: { query?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const query = typeof body.query === "string" ? body.query.trim() : "";
  if (!query || query.length > 200) {
    return NextResponse.json(
      { error: "A valid search query is required" },
      { status: 400 },
    );
  }

  const clientId = request.headers.get("x-client-id") || "";
  if (!clientId || clientId.length > 128) {
    return NextResponse.json(
      { error: "Missing client id" },
      { status: 400 },
    );
  }

  // Single attempt capped under typical serverless timeouts (Vercel hobby ~60s)
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 50_000);

  try {
    const res = await fetch(`${API_BASE}/api/music/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": clientId,
      },
      body: JSON.stringify({ query }),
      signal: controller.signal,
    });

    let data: unknown;
    try {
      data = await res.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid response from search service" },
        { status: 502 },
      );
    }
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return NextResponse.json(
        { error: "Search timed out. Please try again." },
        { status: 504 },
      );
    }
    return NextResponse.json(
      { error: "Search service unavailable. Please try again." },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
