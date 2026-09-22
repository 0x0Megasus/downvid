import { NextResponse } from "next/server";

const API_BASE =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export async function POST(request: Request) {
  let body: { sessionId?: unknown; optionId?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const sessionId =
    typeof body.sessionId === "string" ? body.sessionId.trim() : "";
  const optionId =
    typeof body.optionId === "string" ? body.optionId.trim() : "";
  if (!sessionId || !optionId || sessionId.length > 256 || optionId.length > 64) {
    return NextResponse.json(
      { error: "sessionId and optionId are required" },
      { status: 400 },
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);
  try {
    const res = await fetch(`${API_BASE}/api/music/download`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, optionId }),
      signal: controller.signal,
    });
    let data: unknown;
    try {
      data = await res.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid response from music download service" },
        { status: 502 },
      );
    }
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return NextResponse.json(
        { error: "Music download timed out. Please try again." },
        { status: 504 },
      );
    }
    return NextResponse.json(
      { error: "Failed to connect to music download service" },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
