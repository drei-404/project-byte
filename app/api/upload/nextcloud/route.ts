import { NextResponse } from "next/server";

export const runtime = "nodejs"; // ✅ REQUIRED

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = encodeURIComponent(file.name);

    const baseUrl = process.env.NEXTCLOUD_BASE_API_URL!;
    const email = process.env.NEXTCLOUD_EMAIL!;
    const username = process.env.NEXTCLOUD_USERNAME!;
    const password = process.env.NEXTCLOUD_APP_PASSWORD!;
    const folder = "byte-images";

    const nextcloudUrl = `${baseUrl}/${username}/${folder}/${filename}`;

    const auth =
      Buffer.from(`${email}:${password}`).toString("base64");

    const ncRes = await fetch(nextcloudUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': file.type,
        'Content-Length': buffer.length.toString(),
      },
      body: buffer,
    });

    if (!ncRes.ok) {
      const text = await ncRes.text();
      return NextResponse.json(
        { error: 'Nextcloud upload failed', details: text },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      filename,
      url: nextcloudUrl,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? 'Server error' },
      { status: 500 },
    );
  }
}
