import { NextResponse } from "next/server";

const API_BASE = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const clientId = request.headers.get("x-client-id") || "";

  for (let attempt = 0; attempt < 2; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 55000);

    try {
      const res = await fetch(`${API_BASE}/api/music/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-client-id": clientId,
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      const data = await res.json();
      return NextResponse.json(data, { status: res.status });
    } catch (err) {
      clearTimeout(timeout);

      if (attempt === 1) {
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
      }
    }
  }
}
