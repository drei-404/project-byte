import prisma from "@/lib/db";

import { DataTable } from "./data-table";
import { columns } from "./columns";

type OrganizationsRow = {
  name: string;
  location: string;
  trainingStartedAt: string;
}

export default async function Organizations() {

  const org = await prisma.organization.findMany({
    orderBy: { trainingStartedAt: "desc" },
  })

  const data: OrganizationsRow[] = org.map(org => ({
    id: org.id,
    name: org.name,
    location: org.location,
    trainingStartedAt: org.trainingStartedAt.toLocaleDateString(),
  }))



  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
}
