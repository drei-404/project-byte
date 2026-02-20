import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import UpdateTraineeForm from "./update-trainee-form";

type PageProps = {
  params: Promise<{ id: string; organizationId: string }>;
};

export default async function UpdateTraineePage({ params }: PageProps) {
  const { id, organizationId } = await params;

  const trainee = await prisma.trainee.findUnique({
    where: { id },
    select: {
      id: true,
      profilePhoto: true,
      fullName: true,
      email: true,
      phoneNumber: true,
      address: true,
      skills: true,
      organizationId: true,
    },
  });

  if (!trainee || trainee.organizationId !== organizationId) {
    notFound();
  }

  return <UpdateTraineeForm initialData={trainee} />;
}
