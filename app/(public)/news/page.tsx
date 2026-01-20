import prisma from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

export default async function News() {
  const news = await prisma.newsPost.findMany({
    where: {
      status: true,
    },
    orderBy: {
      createdAt: "desc"
    },
  });

  return (
    <div className="p-20">
      <h1 className="text-3xl mb-5">News</h1>

      <ul>
        {news.map((news) =>
          <li key={news.id}>
            {news.featuredImage && (
              <Image
                src={`/api/image-proxy?url=${encodeURIComponent(news.featuredImage)}`}
                alt={news.title}
                width={800}
                height={600}
                unoptimized
                className="mt-2 rounded max-w-full"
              />
            )}
            <Link href={`/news/${news.id}`}><strong>{news.title}</strong></Link>
            <p>{news.content}</p>
          </li>
        )}
      </ul>
    </div>
  )
}
