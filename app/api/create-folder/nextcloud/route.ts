import { NextResponse } from "next/server";

export const runtime = "nodejs";

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXTCLOUD_BASE_API_URL!;
    const email = process.env.NEXTCLOUD_EMAIL!;
    const username = process.env.NEXTCLOUD_USERNAME!;
    const password = process.env.NEXTCLOUD_APP_PASSWORD!;

    const folderName = slugify(title);
    const folderPath = `byte-images/${folderName}`;
    const folderUrl = `${baseUrl}/${username}/${folderPath}`;

    const auth = Buffer.from(`${email}:${password}`).toString("base64");

    const mkcolRes = await fetch(folderUrl, {
      method: "MKCOL",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    // 201 = created, 405 = already exists
    if (![201, 405].includes(mkcolRes.status)) {
      const text = await mkcolRes.text();
      return NextResponse.json(
        { error: "Failed to create folder", details: text },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      folder: folderPath,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? "Server error" },
      { status: 500 }
    );
  }
}
