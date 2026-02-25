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
    const name = formData.get("name") as string;

    if (!name) {
      return NextResponse.json(
        { error: "Organization name is required" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXTCLOUD_BASE_API_URL!;
    const email = process.env.NEXTCLOUD_EMAIL!;
    const username = process.env.NEXTCLOUD_USERNAME!;
    const password = process.env.NEXTCLOUD_APP_PASSWORD!;

    const folderName = slugify(name);

    const baseFolderPath = `byte-images/organizations/${folderName}`;
    const profilePath = `${baseFolderPath}/profile`;
    const traineesPath = `${baseFolderPath}/trainee-profiles`;

    const auth = Buffer.from(`${email}:${password}`).toString("base64");

    /** Create base folder */
    await createFolder(
      `${baseUrl}/${username}/${baseFolderPath}`,
      auth
    );

    /** Create profile folder */
    await createFolder(
      `${baseUrl}/${username}/${profilePath}`,
      auth
    );

    /** Create trainees folder */
    await createFolder(
      `${baseUrl}/${username}/${traineesPath}`,
      auth
    );

    return NextResponse.json({
      success: true,
      folders: {
        base: baseFolderPath,
        profile: profilePath,
        trainees: traineesPath,
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
