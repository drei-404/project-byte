"use client";

import * as React from "react";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { IconCircleCheckFilled, IconLoader } from "@tabler/icons-react";
import { AdminRole } from "@/lib/generated/prisma/enums";
import { updateUser } from "@/actions/actions";
import { useToast } from "@/contexts/toast-context";

export type User = {
  id: string;
  email: string;
  role: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

function UpdateUserDialog({ user }: { user: User }) {
  const [isSuspended, setIsSuspended] = React.useState(user.status);
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();

  async function handleSubmit(formData: FormData) {
    try {
      await updateUser(formData);
      toast.success("User updated successfully");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update user");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Edit
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <form action={handleSubmit}>
          <input type="hidden" name="id" value={user.id} />
          <input type="hidden" name="isSuspended" value={String(isSuspended)} />
          <DialogHeader>
            <DialogTitle>Update User</DialogTitle>
            <Separator />
            <DialogDescription className="font-medium text-foreground">
              Email
            </DialogDescription>
            <Input value={user.email} disabled className="bg-muted" />

            <DialogDescription className="font-medium text-foreground">
              Role
            </DialogDescription>
            <NativeSelect name="role" defaultValue={user.role}>
              {Object.values(AdminRole).map((role) => (
                <NativeSelectOption key={role} value={role}>
                  {role}
                </NativeSelectOption>
              ))}
            </NativeSelect>

            <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/20">
              <div className="space-y-0.5">
                <Label className="text-base">Status</Label>
                <p className="text-sm text-muted-foreground">
                  {isSuspended
                    ? "This user is suspended"
                    : "This user is active"}
                </p>
              </div>
              <Switch
                checked={isSuspended}
                onCheckedChange={setIsSuspended}
              />
            </div>

            <div className="relative flex justify-end gap-4">
              <Button type="submit">
                <span>Save Changes</span>
              </Button>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            </div>
          </DialogHeader>
        </form>
      </DialogContent>
    </Dialog>
  );
}

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
      const user = row.original;

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
            <UpdateUserDialog user={user} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
