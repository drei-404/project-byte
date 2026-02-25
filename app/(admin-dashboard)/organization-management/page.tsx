import prisma from "@/lib/db";

import { DataTable } from "./data-table";
import { columns } from "./columns";

type OrganizationsRow = {
  acronym: string | null;
  name: string;
  location: string;
  trainingStartedAt: string;
}

export default async function Organizations() {

  const org = await prisma.organization.findMany({
    orderBy: { trainingStartedAt: "desc" },
    include: { trainees: true },
  })

  const data: OrganizationsRow[] = org.map(org => ({
    id: org.id,
    acronym: org.acronym,
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
