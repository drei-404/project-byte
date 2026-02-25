// app/api/image-proxy/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const imageUrl = req.nextUrl.searchParams.get("url");

  if (!imageUrl) {
    return NextResponse.json({ error: "Missing image URL" }, { status: 400 });
  }

  try {
    const email = process.env.NEXTCLOUD_EMAIL!;
    const password = process.env.NEXTCLOUD_APP_PASSWORD!;
    const authHeader = "Basic " + Buffer.from(`${email}:${password}`).toString("base64");

    const response = await fetch(imageUrl, {
      headers: {
        Authorization: authHeader,
      },
    });

    if (!response.ok) {
      return new NextResponse(null, { status: response.status });
    }

    const contentType = response.headers.get("Content-Type") || "image/jpeg";
    const buffer = Buffer.from(await response.arrayBuffer());

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
  }
}
