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
import { Badge } from "@/components/ui/badge";
import { IconCircleCheckFilled, IconLoader } from "@tabler/icons-react";
import Link from "next/link";
import UpdateUserForm from "./update-user/update-user-form";
import { DialogTrigger } from "@radix-ui/react-dialog";

export type User = {
  id: string;
  email: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: () => <div className="text-left">Email</div>,
    cell: ({ getValue }) => (
      <div className="text-left">{getValue<string>()}</div>
    ),
  },

  {
    accessorKey: "role",
    header: () => <div className="text-center">Role</div>,
    cell: ({ getValue }) => (
      <div className="text-center">{getValue<string>()}</div>
    ),
  },

  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const suspended = row.original.status;

      return (
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className="flex items-center gap-1.5 text-muted-foreground px-2"
          >
            {suspended ? (
              <>
                <IconLoader className="h-4 w-4 text-yellow-500" />
                <span>SUSPENDED</span>
              </>
            ) : (
              <>
                <IconCircleCheckFilled className="h-4 w-4 fill-green-500 dark:fill-green-400" />
                <span className="font-semibold">ACTIVE</span>
              </>
            )}
          </Badge>
        </div>
      );
    },
    size: 180,
  },

  {
    accessorKey: "createdAt",
    header: () => <div className="text-left">Created At</div>,
    cell: ({ getValue }) => (
      <div className="text-left">{getValue<string>()}</div>
    ),
  },

  {
    accessorKey: "updatedAt",
    header: () => <div className="text-left">Updated At</div>,
    cell: ({ getValue }) => (
      <div className="text-left">{getValue<string>()}</div>
    ),
  },

  {
    id: "actions",
    size: 60,
    cell: ({ row }) => {
      const userId = row.original.id;

      return (
        <>
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
              <DropdownMenuItem>
                <UpdateUserForm>
                  <span>Update</span>
                </UpdateUserForm>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
