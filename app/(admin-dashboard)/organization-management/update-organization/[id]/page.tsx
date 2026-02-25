import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import UpdateOrgForm from "./update-org-form";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function UpdateOrgPage({ params }: PageProps) {
  const { id } = await params;

  const org = await prisma.organization.findUnique({
    where: { id },
    select: {
      id: true,
      acronym: true,
      name: true,
      location: true,
      profilePhoto: true,
      trainingStartedAt: true,
    },
  });

  if (!org) {
    notFound();
  }

  return <UpdateOrgForm initialData={org} />;
}
