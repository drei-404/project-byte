import { NextResponse } from "next/server";
import { slugify } from "@/lib/slugify";

export const runtime = "nodejs";

async function createFolder(
  url: string,
  auth: string
): Promise<void> {
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

    const baseFolderPath = `byte-images/news/${folderName}`;
    const featuredPath = `${baseFolderPath}/featured`;
    const galleryPath = `${baseFolderPath}/gallery`;

    const auth = Buffer.from(`${email}:${password}`).toString("base64");

    /** 1️⃣ Create base folder */
    await createFolder(
      `${baseUrl}/${username}/${baseFolderPath}`,
      auth
    );

    /** 2️⃣ Create featured folder */
    await createFolder(
      `${baseUrl}/${username}/${featuredPath}`,
      auth
    );

    /** 3️⃣ Create gallery folder */
    await createFolder(
      `${baseUrl}/${username}/${galleryPath}`,
      auth
    );

    return NextResponse.json({
      success: true,
      folders: {
        base: baseFolderPath,
        featured: featuredPath,
        gallery: galleryPath,
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
