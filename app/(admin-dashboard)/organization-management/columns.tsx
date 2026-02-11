"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";

export type OrganizationsRow = {
  id: string;
  acronym: string | null;
  name: string;
  location: string;
  trainingStartedAt: string;
};

export const columns: ColumnDef<OrganizationsRow>[] = [
  {
    accessorKey: "acronym",
    header: () => <div className="text-center">Acronym</div>,
    cell: ({ getValue }) => (
      <div className="text-center">{getValue<string>()}</div>
    ),
  },
  {
    accessorKey: "name",
    header: () => <div className="text-center">Organization Name</div>,
    cell: ({ getValue }) => (
      <div className="text-center">{getValue<string>()}</div>
    ),
  },

  {
    accessorKey: "location",
    header: () => <div className="text-center">Location</div>,
    cell: ({ getValue }) => (
      <div className="text-center">{getValue<string>()}</div>
    ),
  },

  {
    accessorKey: "trainingStartedAt",
    header: () => <div className="text-center">Joined</div>,
    cell: ({ getValue }) => (
      <div className="text-center">{getValue<string>()}</div>
    ),
  },

  {
    id: "actions",
    size: 60,
    cell: ({ row }) => {
      const orgId = row.original.id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link
              href={`/organization-management/update-organization/${orgId}`}
              passHref
            >
              <DropdownMenuItem asChild>
                <span>Update</span>
              </DropdownMenuItem>
            </Link>
            <Link
              href={`/organization-management/trainees/${orgId}`}
              passHref
            >
              <DropdownMenuItem asChild>
                <span>Trainees</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
