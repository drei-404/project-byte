import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import UpdateNewsFormClient from "./update-org-form";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function UpdateNewsPage({ params }: PageProps) {
  const { id } = await params;

  const news = await prisma.newsPost.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      featuredImage: true,
      imageGallery: true,
      status: true,
    },
  });

  if (!news) {
    notFound();
  }

  return <UpdateNewsFormClient initialData={news} />;
}
