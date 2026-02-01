"use client";

import * as React from "react";
import { createOrganization } from "@/actions/actions";
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
import { Calendar } from "@/components/ui/calendar";
import { Field } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PlusIcon } from "lucide-react";
import { useToast } from "@/contexts/toast-context";

export default function CreateOrgForm() {
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();
  const [openCalendar, setOpenCalendar] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  async function handleSubmit(formData: FormData) {
    try {
      await createOrganization(formData);
      toast.success("User created successfully");
      setOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create user",
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon />
          <span>Add Organization</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form action={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Organization</DialogTitle>
            <Separator />
            <DialogDescription className="font-medium text-foreground">
              Organization Name
            </DialogDescription>
            <Input id="name" name="name" placeholder="Organization Name" />

            <DialogDescription className="font-medium text-foreground">
              Location
            </DialogDescription>
            <Input id="location" name="location" placeholder="Location" />

            <DialogDescription className="font-medium text-foreground">
              Joined At
            </DialogDescription>

            <Field className="mx-auto mb-4">
              <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="joined"
                    name="joined"
                    className="justify-start font-normal"
                  >
                    <input
                      type="hidden"
                      name="joined"
                      value={date ? date.toISOString() : ""}
                    />
                    {date ? date.toLocaleDateString() : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    defaultMonth={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDate(date);
                      setOpenCalendar(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </Field>

            <div className="relative flex justify-end gap-4">
              <Button type="submit">
                <span>Add Organization</span>
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
