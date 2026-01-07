"use server";

import prisma from "@/lib/db";


export default async function createNews(formData: FormData) {
  await prisma.newsPost.create({
    data: {
      title: formData.get("title") as string,
      published: Boolean(formData.get("published")),
      content: formData.get("content") as string,
      authorID: formData.get("author") as string,
    },
  });
}
