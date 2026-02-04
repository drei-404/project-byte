import prisma from "@/lib/db";
import { DataTable } from "./data-table";
import { columns } from "./columns";

interface PageProps {
  params: { organizationId: string };
}

export default async function Trainees({ params }: PageProps) {
  const trainees = await prisma.trainee.findMany({
    where: {
      organizationId: params.organizationId,
    },
    orderBy: {
      fullName: "asc",
    },
  });

  const data: TraineesRow = trainees.map((trainee) => ({
    id: trainee.id,
    fullName: trainee.fullName,
    email: trainee.email,
    phoneNumber: trainee.phoneNumber,
    rating: trainee.rating,
    passed: trainee.passed,
  }));

  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
}
