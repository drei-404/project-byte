import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function DELETE(req: Request) {
  try {
    const { url } = await req.json();

    // Validation
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Security: Validate URL contains byte-images/
    if (!url.includes("byte-images/")) {
      return NextResponse.json(
        { error: "Invalid URL: must be a byte-images path" },
        { status: 400 }
      );
    }

    // Security: Reject path traversal attempts
    if (url.includes("..")) {
      return NextResponse.json(
        { error: "Invalid URL: path traversal not allowed" },
        { status: 400 }
      );
    }

    // Security: Only allow gallery image deletions (not featured images)
    if (!url.includes("/gallery/")) {
      return NextResponse.json(
        { error: "Invalid URL: only gallery images can be deleted" },
        { status: 400 }
      );
    }

    const email = process.env.NEXTCLOUD_EMAIL!;
    const password = process.env.NEXTCLOUD_APP_PASSWORD!;

    const auth = Buffer.from(`${email}:${password}`).toString("base64");

    // Send DELETE request to Nextcloud
    const ncRes = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    if (!ncRes.ok && ncRes.status !== 404) {
      // 404 is acceptable - file may already be deleted
      const text = await ncRes.text();
      return NextResponse.json(
        { error: "Nextcloud delete failed", details: text },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      deleted: url,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}
