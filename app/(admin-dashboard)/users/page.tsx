import prisma from "@/lib/db";

import { DataTable } from "./data-table";
import { columns } from "./columns";

type PageProps = {
  params: Promise<{ id: string }>;
};

type UserRow = {
  id: string
  email: string
  status: boolean
  role: string
  createdAt: string
  updatedAt: string
}

export default async function NewsPost({ params }: PageProps) {

  const user = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  })

  const data: UserRow[] = user.map(user => ({
    id: user.id,
    email: user.email,
    status: user.isSuspended,
    role: user.role,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }))



  return (
    <>

      <DataTable columns={columns} data={data} />
    </>
  );
}
