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

export type NewsPost = {
  title: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<NewsPost>[] = [
  {
    accessorKey: "title",
    header: () => <div className="text-left">Title</div>,
    size: 200,
    minSize: 200,
    maxSize: 200,
    cell: ({ getValue }) => {
      const title = getValue<string>();

      return (
        <div title={title} className="truncate">
          {title}
        </div>
      );
    },
  },
  {
    accessorKey: "published",
    header: () => <div className="text-center">Publish Status</div>,
    cell: ({ row }) => {
      const published = row.original.published;

      return (
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className="flex items-center gap-1.5 text-muted-foreground px-2"
          >
            {published ? (
              <>
                <IconCircleCheckFilled className="h-4 w-4 fill-green-500 dark:fill-green-400" />
                <span className="font-semibold">PUBLISHED</span>
              </>
            ) : (
              <>
                <IconLoader className="h-4 w-4 text-yellow-500" />
                <span>UNPUBLISHED</span>
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
    cell: ({ row }) => (
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
          <DropdownMenuItem>Update</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
