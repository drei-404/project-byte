import { NextResponse } from "next/server";
import { slugify } from "@/lib/slugify";
import prisma from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const fullName = formData.get("fullName") as string;
    const organizationId = formData.get("organizationId") as string;

    // Validation
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!fullName) {
      return NextResponse.json(
        { error: "Full name is required" },
        { status: 400 },
      );
    }

    if (!organizationId) {
      return NextResponse.json(
        { error: "Organization ID is required" },
        { status: 400 },
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files allowed" },
        { status: 400 },
      );
    }

    // Validate file size (5MB max)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large (max 5MB)" },
        { status: 400 },
      );
    }

    // Look up organization name from DB
    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
      select: { name: true },
    });

    if (!organization) {
      return NextResponse.json(
        { error: "Organization not found" },
        { status: 404 },
      );
    }

    const orgSlug = slugify(organization.name);
    const traineeSlug = slugify(fullName);

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = encodeURIComponent(
      file.name.replace(/[^a-zA-Z0-9.-]/g, "_"),
    );

    const baseUrl = process.env.NEXTCLOUD_BASE_API_URL!;
    const email = process.env.NEXTCLOUD_EMAIL!;
    const username = process.env.NEXTCLOUD_USERNAME!;
    const password = process.env.NEXTCLOUD_APP_PASSWORD!;

    const folderPath = `byte-images/organizations/${orgSlug}/trainee-profiles/${traineeSlug}`;
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
        const basePath = `${baseUrl}/${username}/byte-images/organizations/${orgSlug}`;

        // Create org folder
        await fetch(basePath, {
          method: "MKCOL",
          headers: { Authorization: `Basic ${auth}` },
        });

        // Create trainee-profiles folder
        await fetch(`${basePath}/trainee-profiles`, {
          method: "MKCOL",
          headers: { Authorization: `Basic ${auth}` },
        });

        // Create trainee folder
        await fetch(`${basePath}/trainee-profiles/${traineeSlug}`, {
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
            { status: 500 },
          );
        }
      } else {
        const text = await ncRes.text();
        return NextResponse.json(
          { error: "Nextcloud upload failed", details: text },
          { status: 500 },
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
      { status: 500 },
    );
  }
}
