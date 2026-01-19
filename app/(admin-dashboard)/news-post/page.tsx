import prisma from "@/lib/db";

import { DataTable } from "./data-table";
import { columns } from "./columns";

type PageProps = {
  params: Promise<{ id: string }>;
};

type NewsPostRow = {
  title: string
  status: boolean
  createdAt: string
  updatedAt: string
}

export default async function NewsPost({ params }: PageProps) {
  const user = await prisma.user.findUnique({
    where: { id: "1" },
  });

  const news = await prisma.newsPost.findMany({
    orderBy: { createdAt: "desc" },
  })

  const data: NewsPostRow[] = news.map(news => ({
    title: news.title,
    status: news.status,
    createdAt: news.createdAt.toISOString(),
    updatedAt: news.updatedAt.toISOString(),
  }))



  return (
    <>

      <DataTable columns={columns} data={data} />
    </>
  );
}
