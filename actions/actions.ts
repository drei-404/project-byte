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
