import { getPlaceholderImage } from "../../util/images";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const src = url.searchParams.get("src");

  if (!src) {
    return NextResponse.json(
      { error: "Missing src parameter" },
      { status: 400 }
    );
  }

  try {
    const result = await getPlaceholderImage(src);

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Placeholder generation error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate placeholder",
        placeholder:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, max-age=3600",
          "Content-Type": "application/json",
        },
      }
    );
  }
}
