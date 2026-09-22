import { NextResponse } from "next/server";

const API_BASE =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

const ID_PATTERN = /^[A-Za-z0-9_-]{4,128}$/;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!ID_PATTERN.test(id)) {
    return NextResponse.json({ error: "Invalid file id" }, { status: 400 });
  }

  try {
    const headers: Record<string, string> = {};
    const range = request.headers.get("range");
    if (range) headers["Range"] = range;

    const res = await fetch(`${API_BASE}/api/file/${id}`, { headers });

    if (!res.ok || !res.body) {
      let msg = "File not found";
      try {
        const errJson = (await res.json()) as { error?: string };
        if (errJson?.error) msg = errJson.error;
      } catch {
        // backend streams bytes on success, JSON only on error
      }
      return NextResponse.json(
        { error: msg },
        { status: res.status === 416 ? 416 : 404 },
      );
    }

    const passthrough = new Headers();
    const copy = (name: string) => {
      const v = res.headers.get(name);
      if (v) passthrough.set(name, v);
    };
    copy("content-type");
    copy("content-length");
    copy("content-disposition");
    copy("accept-ranges");
    copy("content-range");
    passthrough.set("Cache-Control", "no-cache, no-store, must-revalidate");

    if (!passthrough.has("content-disposition")) {
      passthrough.set("content-disposition", `attachment; filename="${id}"`);
    }

    return new NextResponse(res.body, {
      status: res.status, // preserve 200 / 206 for range requests
      headers: passthrough,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to download file" },
      { status: 502 },
    );
  }
}
