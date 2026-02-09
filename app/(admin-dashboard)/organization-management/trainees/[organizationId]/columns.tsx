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

export type TraineesRow = {
  id: string;
  fullName: string;
  email: string | null;
  phoneNumber: string | null;
  address: string | null;
};

export const columns: ColumnDef<TraineesRow>[] = [
  {
    accessorKey: "fullName",
    header: () => <div className="text-center">Trainee Name</div>,
    cell: ({ getValue }) => (
      <div className="text-center">{getValue<string>()}</div>
    ),
  },

  {
    accessorKey: "email",
    header: () => <div className="text-center">Email</div>,
    cell: ({ getValue }) => (
      <div className="text-center">{getValue<string>()}</div>
    ),
  },

  {
    accessorKey: "phoneNumber",
    header: () => <div className="text-center">Phone Number</div>,
    cell: ({ getValue }) => (
      <div className="text-center">{getValue<string>()}</div>
    ),
  },

  {
    id: "actions",
    size: 60,
    cell: ({ row }) => {
      const traineeId = row.original.id;

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
              <Link href={`/organization-management/update-organization/${traineeId}`}>
              <DropdownMenuItem>
                Update
              </DropdownMenuItem>
</Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
