"use client";

import { createUsers } from "@/actions/actions";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { AdminRole } from "@/lib/generated/prisma/enums";
import { PlusIcon } from "lucide-react";
import React from "react";

interface Props {
  children: React.ReactNode
}

export default function UpdateUserForm({ children }: Props) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent>
          <form action={createUsers}>
            <DialogHeader>
              <DialogTitle>Create User</DialogTitle>
              <Separator />
              <></>
              <DialogDescription className="font-medium text-foreground">
                Email
              </DialogDescription>
              <Input id="email" name="email" placeholder="Email" />

              <DialogDescription className="font-medium text-foreground">
                Role
              </DialogDescription>
              <NativeSelect name="role" defaultValue={AdminRole.ADMIN}>
                {Object.values(AdminRole).map((role) => (
                  <NativeSelectOption key={role} value={role}>
                    {role}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              <div className="relative flex justify-end gap-4">
                <Button type="submit">
                  <span>Add User</span>
                </Button>
                <DialogClose asChild>
                  <Button variant={"outline"}>Cancel</Button>
                </DialogClose>
              </div>
            </DialogHeader>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
