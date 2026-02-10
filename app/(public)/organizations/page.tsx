import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/db";
import { truncateWords } from "@/lib/format-content";
import Image from "next/image";
import Link from "next/link";

const ITEMS_PER_PAGE = 15;

interface OrganizationCardProps {
  org: {
    id: string;
    name: string;
    location: string | null;
    profilePhoto: string | null;
    trainingStartedAt: Date;
  };
}

function OrganizationCard({ org }: OrganizationCardProps) {
  return (
    <Link href={`/news/${org.id}`} className="group w-50">
      <article className="h-full border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-shadow">
        {/* Image with fixed aspect ratio */}
        <div className="relative aspect-video bg-muted">
          {org.profilePhoto ? (
            <Image
              src={`/api/image-proxy?url=${encodeURIComponent(org.profilePhoto)}`}
              alt={org.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h2 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {org.name}
          </h2>
          <p className="text-xs">{org.location}</p>
          <div className="flex justify-end">
            <time className="mt-2 block text-xs text-muted-foreground ">
              {org.trainingStartedAt.toLocaleDateString()}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav
      className="flex items-center justify-center gap-2 mt-8"
      aria-label="Pagination"
    >
      {/* Previous button */}
      {currentPage > 1 ? (
        <Link
          href={`/news?page=${currentPage - 1}`}
          className="px-3 py-2 rounded border hover:bg-muted transition-colors"
        >
          Previous
        </Link>
      ) : (
        <span className="px-3 py-2 rounded border text-muted-foreground cursor-not-allowed">
          Previous
        </span>
      )}

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-2 py-1">
              ...
            </span>
          ) : (
            <Link
              key={page}
              href={`/news?page=${page}`}
              className={`px-3 py-1 rounded transition-colors ${
                page === currentPage
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {page}
            </Link>
          ),
        )}
      </div>

      {/* Next button */}
      {currentPage < totalPages ? (
        <Link
          href={`/news?page=${currentPage + 1}`}
          className="px-3 py-2 rounded border hover:bg-muted transition-colors"
        >
          Next
        </Link>
      ) : (
        <span className="px-3 py-2 rounded border text-muted-foreground cursor-not-allowed">
          Next
        </span>
      )}
    </nav>
  );
}

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function OrganizationsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params?.page) || 1);

  const [organization, totalCount] = await Promise.all([
    prisma.organization.findMany({
      orderBy: { trainingStartedAt: "desc" },
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
      select: {
        id: true,
        name: true,
        location: true,
        profilePhoto: true,
        trainingStartedAt: true,
      },
    }),
    prisma.organization.count(),
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="relative mx-auto my-10 flex max-w-300 flex-col items-start justify-center gap-10 pb-12">
      <div className="flex flex-col items-center gap-8 w-full">
        <div className="flex flex-col text-center gap-4">
        <h1 className="text-3xl font-bold">Organizations</h1>
        <p className="px-30">
          Institutions affiliated with Byte through curriculum adoption or collaboration.
        </p>
      </div>
      <Link
            href="/#footer"
            className="group inline-flex items-center gap-2 rounded-xl border px-6 py-3 w-fit font-medium transition-all hover:-translate-y-0.5"
          >
            Apply for BYTE
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
          </div>

      {organization.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">
          No news articles available.
        </p>
      ) : (
        <>
          {/* Responsive grid: 1 col mobile, 3 col tablet, 5 col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {organization.map((org) => (
              <OrganizationCard
                key={org.id}
                org={org}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination currentPage={page} totalPages={totalPages} />

          {/* Page info */}
          <p className="text-center text-sm text-muted-foreground mt-4">
            Page {page} of {totalPages} ({totalCount} total organizations)
          </p>
        </>
      )}
    </div>
  );
}
