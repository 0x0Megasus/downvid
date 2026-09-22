import { NextResponse } from "next/server";

const API_BASE =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

const ID_PATTERN = /^[A-Za-z0-9_-]{4,128}$/;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!ID_PATTERN.test(id)) {
    return NextResponse.json({ error: "Invalid download id" }, { status: 400 });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20_000);
  try {
    const res = await fetch(`${API_BASE}/api/progress/${id}`, {
      signal: controller.signal,
    });
    let data: unknown;
    try {
      data = await res.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid response from download service" },
        { status: 502 },
      );
    }
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return NextResponse.json(
        { error: "Progress request timed out" },
        { status: 504 },
      );
    }
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 502 },
    );
  } finally {
    clearTimeout(timer);
  }
}
