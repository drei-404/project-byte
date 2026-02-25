import prisma from "@/lib/db";
import LatestNewsClient from "./latest-news-client";

export default async function LatestNews() {
  const latestNews = await prisma.newsPost.findMany({
    where: {
      status: true, // only published
    },
    orderBy: {
      createdAt: "desc", // latest first
    },
    take: 5, // max 5 only
    select: {
      id: true,
      title: true,
      content: true,
      featuredImage: true,
      createdAt: true,
    },
  });

  return <LatestNewsClient news={latestNews} />;
}
