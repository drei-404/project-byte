import prisma from "@/lib/db";

export default async function AdminPage() {
  const news = await prisma.newsPost.findMany();

  return (
    <div className="p-20">
      <h1 className="text-3xl">Post</h1>

      <ul>
        {news.map((p) =>
          <li key={p.id}>
            <strong>{p.title}</strong>
            <p>{p.content}</p>
          </li>
        )}
      </ul>
    </div>
  )
}
