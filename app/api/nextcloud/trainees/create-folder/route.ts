import { NextResponse } from "next/server";
import { slugify } from "@/lib/slugify";
import prisma from "@/lib/db";

export const runtime = "nodejs";

async function createFolder(url: string, auth: string): Promise<void> {
  const res = await fetch(url, {
    method: "MKCOL",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  // 201 = created, 405 = already exists
  if (![201, 405].includes(res.status)) {
    const text = await res.text();
    throw new Error(text || "Failed to create folder");
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const fullName = formData.get("fullName") as string;
    const organizationId = formData.get("organizationId") as string;

    if (!fullName || !organizationId) {
      return NextResponse.json(
        { error: "Full name is required" },
        { status: 400 }
      );
    }

    /** 1️⃣ Resolve organization from DB */
    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
      select: { name: true },
    });

    if (!organization) {
      return NextResponse.json(
        { error: "Organization not found" },
        { status: 404 }
      );
    }

    /** 2️⃣ Build deterministic folder path */
    const orgSlug = slugify(organization.name);
    const traineeSlug = slugify(fullName);

    const traineeFolderPath =
      `byte-images/organizations/${orgSlug}/trainee-profiles/${traineeSlug}`;

    /** 3️⃣ Nextcloud auth */
    const baseUrl = process.env.NEXTCLOUD_BASE_API_URL!;
    const email = process.env.NEXTCLOUD_EMAIL!;
    const username = process.env.NEXTCLOUD_USERNAME!;
    const password = process.env.NEXTCLOUD_APP_PASSWORD!;
    const auth = Buffer.from(`${email}:${password}`).toString("base64");

    /** 4️⃣ Create trainee folder */
    await createFolder(
      `${baseUrl}/${username}/${traineeFolderPath}`,
      auth
    );

    return NextResponse.json({
      success: true,
      folders: {
        trainee: traineeFolderPath,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Folder creation failed",
        details: error.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}
