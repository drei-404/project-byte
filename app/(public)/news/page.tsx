import prisma from "@/lib/db";
import Link from "next/link";

export default async function News() {
  const news = await prisma.newsPost.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: "desc"
    },
    take: 12 // Pagination will take only 12 per page
  });

  return (
    <div className="p-20">
      <h1 className="text-3xl mb-5">News</h1>

      <ul>
        {news.map((news) =>
          <li key={news.id}>
            <Link href={`/news/${news.id}`}><strong>{news.title}</strong></Link>
            <p>{news.content}</p>
          </li>
        )}
      </ul>
    </div>
  )
}
