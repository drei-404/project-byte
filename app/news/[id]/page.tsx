// app/news/[id]/page.tsx
import prisma from "@/lib/db"

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function PostPage({ params }: PageProps) {
  const { id } = await params 

  const post = await prisma.newsPost.findUnique({
    where: { id },
  })

  if (!post) {
    throw new Error("Post not found")
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}
