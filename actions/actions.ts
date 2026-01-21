"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";


export default async function createNews(formData: FormData, uploadedImageUrl?: string) {
  await prisma.newsPost.create({
    data: {
      featuredImage: uploadedImageUrl,
      title: formData.get("title") as string,
      status: Boolean(formData.get("status")),
      content: formData.get("content") as string,
    },
  });
  revalidatePath("/news-post");
}

export async function updateNews(
  formData: FormData,
  id: string,
  uploadedImageUrl?: string
) {
  try {
    // Validation
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const status = formData.get("status") === "true";

    if (!title?.trim()) {
      throw new Error("Title is required");
    }

    if (title.length > 200) {
      throw new Error("Title too long (max 200 characters)");
    }

    // Build update data
    const updateData: any = {
      title: title.trim(),
      content: content?.trim() || null,
      status,
    };

    // Only update image if provided
    if (uploadedImageUrl !== undefined) {
      updateData.featuredImage = uploadedImageUrl;
    }

    // Update in database
    await prisma.newsPost.update({
      where: { id },
      data: updateData,
    });

    // Revalidate cache
    revalidatePath("/news-post");
    revalidatePath(`/news-post/update-news/${id}`);
  } catch (error) {
    console.error("Update news error:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to update news");
  }
}