import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const slug = formData.get("slug") as string;
    const folder = (formData.get("folder") as string) || "profile";

    // Validation
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    // Validate folder is either profile or gallery
    if (folder !== "profile") {
      return NextResponse.json({ error: "Invalid folder (must be 'profile')" }, { status: 400 });
    }

    // Sanitize slug (prevent path traversal)
    const sanitizedSlug = slug.replace(/[^a-z0-9-]/g, "");
    if (sanitizedSlug !== slug || slug.includes("..")) {
      return NextResponse.json({ error: "Invalid slug format" }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files allowed" }, { status: 400 });
    }

    // Validate file size (5MB max)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = encodeURIComponent(file.name.replace(/[^a-zA-Z0-9.-]/g, "_"));

    const baseUrl = process.env.NEXTCLOUD_BASE_API_URL!;
    const email = process.env.NEXTCLOUD_EMAIL!;
    const username = process.env.NEXTCLOUD_USERNAME!;
    const password = process.env.NEXTCLOUD_APP_PASSWORD!;

    // Construct nested path matching create pattern
    const folderPath = `byte-images/organizations/${sanitizedSlug}/${folder}`;
    const nextcloudUrl = `${baseUrl}/${username}/${folderPath}/${filename}`;

    const auth = Buffer.from(`${email}:${password}`).toString("base64");

    // Upload file
    const ncRes = await fetch(nextcloudUrl, {
      method: "PUT",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": file.type,
        "Content-Length": buffer.length.toString(),
      },
      body: buffer,
    });

    if (!ncRes.ok) {
      // If 404, folder might not exist - try to create it
      if (ncRes.status === 404) {
        // Auto-create folder structure
        const basePath = `${baseUrl}/${username}/byte-images/organizations/${sanitizedSlug}`;
        const targetFolderPath = `${basePath}/${folder}`;

        // Create base folder
        await fetch(basePath, {
          method: "MKCOL",
          headers: { Authorization: `Basic ${auth}` },
        });

        // Create target folder (profile)
        await fetch(targetFolderPath, {
          method: "MKCOL",
          headers: { Authorization: `Basic ${auth}` },
        });

        // Retry upload
        const retryRes = await fetch(nextcloudUrl, {
          method: "PUT",
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": file.type,
            "Content-Length": buffer.length.toString(),
          },
          body: buffer,
        });

        if (!retryRes.ok) {
          const text = await retryRes.text();
          return NextResponse.json(
            { error: "Upload failed after folder creation", details: text },
            { status: 500 }
          );
        }
      } else {
        const text = await ncRes.text();
        return NextResponse.json(
          { error: "Nextcloud upload failed", details: text },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      filename,
      url: nextcloudUrl,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? "Server error" },
      { status: 500 }
    );
  }
}
