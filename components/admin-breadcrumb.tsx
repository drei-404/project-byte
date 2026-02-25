"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  users: "Users",
  "create-user": "Create User",
  "news-management": "News Management",
  "create-news": "Create News",
  "update-news": "Update News",
  "organization-management": "Organization Management",
  "create-organization": "Create Organization",
  "update-organization": "Update Organization",
  trainees: "Trainees",
  "add-trainee": "Add Trainee",
  "update-trainee": "Update Trainee",
};

function isLikelyId(segment: string) {
  return /^[a-z0-9]{12,}$/i.test(segment);
}

function toTitle(segment: string) {
  return (
    LABELS[segment] ??
    segment
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  );
}

export default function AdminBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .filter((segment) => !isLikelyId(segment));

  if (segments.length === 0) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const key = `${index}-${segment}`;
          const label = toTitle(segment);
          const isLast = index === segments.length - 1;

          return (
            <BreadcrumbItem key={key}>
              <BreadcrumbPage>{label}</BreadcrumbPage>
              {!isLast && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
