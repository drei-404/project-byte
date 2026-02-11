import prisma from "@/lib/db";
import { formatContentToHtml } from "@/lib/format-content";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function OrganizationDetails({ params }: PageProps) {
  const { id } = await params;

  const org = await prisma.organization.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      location: true,
      trainingStartedAt: true,
      profilePhoto: true,
      trainees: true,
    },
  });

  if (!org) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back link */}
      <Link
        href="/organizations"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        &larr; Back to Organizations
      </Link>

      <div className="flex gap-8">
        {/* Featured Image */}
        {org?.profilePhoto && (
          <div className="relative aspect-square h-40 mb-8 rounded-lg overflow-hidden">
            <Image
              src={`/api/image-proxy?url=${encodeURIComponent(org.profilePhoto)}`}
              alt={org.name}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        )}

        <div>
        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">{org.name} List of Trainees</h1>

        {/* Date */}
        <time className="block text-sm text-muted-foreground mb-6">
          Joined:{" "}
          {org?.trainingStartedAt.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        </div>
        </div>


    </div>
  );
}
